<script>
    import { tick, onMount } from "svelte";
    import { replace, querystring } from "svelte-spa-router";
    import PocketBase from "@/utils/ApiClient";
    import CommonHelper from "@/utils/CommonHelper";
    import {
        pageCollection,
        activeCollection,
        isCollectionsLoading,
        loadCollections,
    } from "@/stores/collections";  
    import { pageTitle } from "@/stores/app";
    import PageWrapper from "@/components/base/PageWrapper.svelte";
    import Searchbar from "@/components/base/Searchbar.svelte";
    import RefreshButton from "@/components/base/RefreshButton.svelte";
    import RecordUpsertPanel from "@/components/records/RecordUpsertPanel.svelte";
    import SiteList from "@/components/texts/SiteList.svelte";
    import RecordsCount from "@/components/records/RecordsCount.svelte";

    $pageTitle = "Texte & Bilder";

    const queryParams = new URLSearchParams($querystring);

    let collectionSchema = $pageCollection;
    let items = [];
    let isLoading = true;
    let recordsCount;
    let siteList;
    let totalCount = 0;
    let recordUpsertPanel;
    let filter = queryParams.get("filter") || "";
    let sort = queryParams.get("sort") || "Titel";

    $: if (sort !== -1 && filter !== -1) {
        // keep listing params in sync
        const query = new URLSearchParams({ filter, sort }).toString();
        replace("/admin/site?" + query);
        
//      load();
    }

    $: if (!$isCollectionsLoading && queryParams.get("recordId")) {
        showRecordById(queryParams.get("recordId"));
    }


    onMount(async () => {
        isLoading = true;

        if (Object.keys($pageCollection).length === 0 && $pageCollection.constructor === Object) {
            await loadCollections();
            collectionSchema = $pageCollection;
        }

        await load();
        

        console.log(collectionSchema);
        return () => {
            items = [];
        };
    });

    async function load() {
        isLoading = true;
        isLoading = false;
    }

    export function loadTexts() {
        const normalizedFilter = CommonHelper.normalizeSearchFilter(filter);
        return PocketBase.collection('Texte')
            .getFullList({
                sort: sort || "Titel",
                filter: normalizedFilter,
            })
            .then((result) => {
                // append result array to items array:
                items = [...items, ...result];               
            })
            .catch((err) => {
                if (!err?.isAbort) {
                    isLoading = false;
                    console.warn(err);
                    ApiClient.error(err, err?.status != 400); // silence filter errors
                }
            });
    }

    export function loadPictures() {
        const normalizedFilter = CommonHelper.normalizeSearchFilter(filter);
        return PocketBase.collection('Bilder')
            .getFullList({
                sort: sort || "Titel",
                filter: normalizedFilter,
            })
            .then((result) => {
                items = [...items, ...result];
            })
            .catch((err) => {
                if (!err?.isAbort) {
                    isLoading = false;
                    console.warn(err);
                    ApiClient.error(err, err?.status != 400); // silence filter errors
                }
            });
    }


    function updateQueryParams(extra = {}) {
        const queryParams = Object.assign(
            {
                collectionId: $activeCollection?.id || "",
                filter: filter,
                sort: sort,
            },
            extra
        );

        CommonHelper.replaceHashQueryParams(queryParams);
    }
</script>

{#if isLoading}
    <PageWrapper center>
        <div class="placeholder-section m-b-base">
            <span class="loader loader-lg" />
            <h1>Texte & Bilder werden geladen... </h1>
        </div>
    </PageWrapper>
<!-- {:else if !admins.length}
    <PageWrapper center>
        <div class="placeholder-section m-b-base">
            <div class="icon">
                <i class="ri-database-2-line" />
            </div>
            <h1 class="m-b-10">Sie haben keinen Zugriff auf die Benutzer-Tabelle.</h1>
        </div>
    </PageWrapper> -->
{:else}

    <PageWrapper class="flex-content">
        <header class="page-header">
            <nav class="breadcrumbs">
                <div class="breadcrumb-item">Webseite</div>
                <div class="breadcrumb-item">Texte & Bilder</div>
            </nav>

            <div class="inline-flex gap-5">
                <RefreshButton
                    on:refresh={() => {
                        siteList?.load();
                        recordsCount?.reload();
                    }}
                />
            </div>

            <div class="btns-group">
                {#if collectionSchema.type !== "view"}
                    <button type="button" class="btn btn-expanded" on:click={() => recordUpsertPanel?.show()}>
                        <i class="ri-add-line" />
                        <span class="txt">Text hinzufügen</span>
                    </button>
                {/if}
            </div>
        </header>

        <Searchbar
            value={filter}
            placeholder={"Suchbegriff oder -filter"}
            extraAutocompleteKeys={["email"]}
            on:submit={(e) => (filter = e.detail)}
        />

        <div class="clearfix m-b-sm" />

        <SiteList
            bind:this={siteList}
            collection={collectionSchema}
            bind:filter
            bind:sort
            on:select={(e) => {
                updateQueryParams({
                    recordId: e.detail.id,
                });

                let showModel = e.detail._partial ? e.detail.id : e.detail;

                recordUpsertPanel?.show(showModel);
            }}
            on:new={() => recordUpsertPanel?.show()}
        />

        <svelte:fragment slot="footer">
            <RecordsCount
                bind:this={recordsCount}
                class="m-r-auto txt-sm txt-hint"
                collection={collectionSchema}
                {filter}
                bind:totalCount
            />
        </svelte:fragment>
    </PageWrapper>
{/if}

<RecordUpsertPanel
    bind:this={recordUpsertPanel}
    collection={collectionSchema}
    on:hide={() => {
        updateQueryParams({ recordId: null });
    }}
    on:save={(e) => {
        if (filter) {
            // if there is applied filter, reload the count since we
            // don't know after the save whether the record satisfies it
            recordsCount?.reload();
        } else if (e.detail.isNew) {
            totalCount++;
        }

        siteList?.load(1);
    }}
/>