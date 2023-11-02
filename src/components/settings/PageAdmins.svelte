<script>
    import { tick } from "svelte";
    import { replace, querystring } from "svelte-spa-router";
    import PocketBase from "@/utils/ApiClient";
    import CommonHelper from "@/utils/CommonHelper";
    import {
        userCollection,
        collections,
        activeCollection,
        isCollectionsLoading,
        loadCollections,
        setActiveCollectionByObject,
    } from "@/stores/collections";
    import { pageTitle } from "@/stores/app";
    import PageWrapper from "@/components/base/PageWrapper.svelte";
    import Searchbar from "@/components/base/Searchbar.svelte";
    import RefreshButton from "@/components/base/RefreshButton.svelte";
    import RecordUpsertPanel from "@/components/records/RecordUpsertPanel.svelte";
    import RecordPreviewPanel from "@/components/records/RecordPreviewPanel.svelte";
    import RecordsList from "@/components/records/RecordsList.svelte";
    import RecordsCount from "@/components/records/RecordsCount.svelte";
    import SettingsSidebar from "./SettingsSidebar.svelte";

    $pageTitle = "Admins";

    const queryParams = new URLSearchParams($querystring);

    let collectionSchema = userCollection;
    let admins = [];
    let isLoading = false;
    let recordsCount;
    let recordsList;
    let totalCount = 0;
    let recordUpsertPanel;
    let recordPreviewPanel;
    let filter = queryParams.get("filter") || "";
    let sort = queryParams.get("sort") || "-created";

    $: if (sort !== -1 && filter !== -1) {
        // keep listing params in sync
        const query = new URLSearchParams({ filter, sort }).toString();
        replace("/settings/admins?" + query);

        loadAdmins();
    }

    export function loadAdmins() {
        isLoading = true;
        admins = []; // reset

        const normalizedFilter = CommonHelper.normalizeSearchFilter(filter, [
            "id",
            "email",
            "created",
            "updated",
        ]);

        return PocketBase.collection('users')
            .getFullList(100, {
                sort: sort || "-created",
                filter: normalizedFilter,
            })
            .then((result) => {
                admins = result;
                isLoading = false;
            })
            .catch((err) => {
                if (!err?.isAbort) {
                    isLoading = false;
                    console.warn(err);
                    clearList();
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

    function clearList() {
        admins = [];
    }
</script>

<SettingsSidebar />

{#if isLoading}
    <PageWrapper center>
        <div class="placeholder-section m-b-base">
            <span class="loader loader-lg" />
            <h1>Benutzer werden geladen... </h1>
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
                <div class="breadcrumb-item">Einstellungen</div>
                <div class="breadcrumb-item">Accounts</div>
            </nav>

            <div class="inline-flex gap-5">
                <RefreshButton
                    on:refresh={() => {
                        loadAdmins();
                        recordsCount?.reload();
                    }}
                />
            </div>

            <div class="btns-group">
                {#if collectionSchema.type !== "view"}
                    <button type="button" class="btn btn-expanded" on:click={() => recordUpsertPanel?.show()}>
                        <i class="ri-add-line" />
                        <span class="txt">Neuer Account</span>
                    </button>
                {/if}
            </div>
        </header>

        <Searchbar
            value={filter}
            placeholder={"Suchbegriff oder -filter wie email ='test@example.com'"}
            extraAutocompleteKeys={["email"]}
            on:submit={(e) => (filter = e.detail)}
        />

        <div class="clearfix m-b-sm" />

        <RecordsList
            bind:this={admins}
            collection={collectionSchema}
            bind:filter
            bind:sort
            on:select={(e) => {
                updateQueryParams({
                    recordId: e.detail.id,
                });

                let showModel = e.detail._partial ? e.detail.id : e.detail;

                collectionSchema.type === "view"
                    ? recordPreviewPanel?.show(showModel)
                    : recordUpsertPanel?.show(showModel);
            }}
            on:delete={() => {
                recordsCount?.reload();
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

        recordsList?.reloadLoadedPages();
    }}
    on:delete={(e) => {
        if (!filter || recordsList?.hasRecord(e.detail.id)) {
            totalCount--;
        }

        recordsList?.reloadLoadedPages();
    }}
/>

<RecordPreviewPanel
    bind:this={recordPreviewPanel}
    collection={collectionSchema}
    on:hide={() => {
        updateQueryParams({ recordId: null });
    }}
/>
