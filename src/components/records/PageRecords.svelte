<script>
    import { tick } from "svelte";
    import { querystring, replace } from "svelte-spa-router";
    import CommonHelper from "@/utils/CommonHelper";
    import {
        collections,
        activeCollection,
        isCollectionsLoading,
        loadCollections,
        changeActiveCollectionById,
        crossReferences
    } from "@/stores/collections";
    import { pageTitle } from "@/stores/app";
    import PageWrapper from "@/components/base/PageWrapper.svelte";
    import Searchbar from "@/components/base/Searchbar.svelte";
    import RefreshButton from "@/components/base/RefreshButton.svelte";
    import CollectionsSidebar from "@/components/collections/CollectionsSidebar.svelte";
    import RecordUpsertPanel from "@/components/records/RecordUpsertPanel.svelte";
    import RecordPreviewPanel from "@/components/records/RecordPreviewPanel.svelte";
    import RecordsList from "@/components/records/RecordsList.svelte";
    import RecordsCount from "@/components/records/RecordsCount.svelte";

    const initialQueryParams = new URLSearchParams($querystring);

    let recordUpsertPanel;
    let recordPreviewPanel;
    let recordsList;
    let recordsCount;
    let searchBar;
    let filter = initialQueryParams.get("filter") || "";
    let sort = initialQueryParams.get("sort") || "-created";
    let selectedCollectionId = initialQueryParams.get("collectionId") || $activeCollection?.id;
    let totalCount = 0; // used to manully change the count without the need of reloading the recordsCount component

    loadCollections(selectedCollectionId);

    $: reactiveParams = new URLSearchParams($querystring);

    $: if (
        !$isCollectionsLoading &&
        reactiveParams.get("collectionId") &&
        reactiveParams.get("collectionId") != selectedCollectionId
    ) {
        changeActiveCollectionById(reactiveParams.get("collectionId"));
        filter = reactiveParams.get("filter") || "";
    }

    // reset filter and sort on collection change
    $: if ($activeCollection?.id && selectedCollectionId != $activeCollection.id) {
        reset();
    }

    $: if ($activeCollection?.id) {
        normalizeSort();
    }

    $: if (!$isCollectionsLoading && initialQueryParams.get("recordId")) {
        showRecordById(initialQueryParams.get("recordId"));
    }

    // keep the url params in sync
    $: if (!$isCollectionsLoading && (sort || filter || $activeCollection?.id)) {
        updateQueryParams();
    }

    $: $pageTitle = $activeCollection?.name || "Collections";

    async function showRecordById(recordId) {
        await tick(); // ensure that the reactive component params are resolved

        $activeCollection?.type === "view"
            ? recordPreviewPanel.show(recordId)
            : recordUpsertPanel?.show(recordId);
    }

    function reset() {
        selectedCollectionId = $activeCollection?.id;
        //filter = "";
        sort = "-created";

        updateQueryParams({ recordId: null });

        normalizeSort();

        // if (searchBar) searchBar.clear();
    }

    // ensures that the sort fields exist in the collection
    async function normalizeSort() {
        if (!sort) {
            return; // nothing to normalize
        }

        const collectionFields = CommonHelper.getAllCollectionIdentifiers($activeCollection);

        const sortFields = sort.split(",").map((f) => {
            if (f.startsWith("+") || f.startsWith("-")) {
                return f.substring(1);
            }
            return f;
        });

        // invalid sort expression or missing sort field
        if (sortFields.filter((f) => collectionFields.includes(f)).length != sortFields.length) {
            if (collectionFields.includes("created")) {
                sort = "-created";
            } else {
                sort = "";
            }
        }
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

{#if $isCollectionsLoading && !$collections.length}
    <PageWrapper center>
        <div class="placeholder-section m-b-base">
            <span class="loader loader-lg" />
            <h1>Loading collections...</h1>
        </div>
    </PageWrapper>
{:else if !$collections.length}
    <PageWrapper center>
        <div class="placeholder-section m-b-base">
            <div class="icon">
                <i class="ri-database-2-line" />
            </div>
            <h1 class="m-b-10">Keine Sammlungen gefunden.</h1>
        </div>
    </PageWrapper>
{:else}
    <CollectionsSidebar />

    <PageWrapper class="flex-content">
        <header class="page-header">
            <nav class="breadcrumbs">
                <div class="breadcrumb-item">Sammlungen</div>
                <div class="breadcrumb-item">{$activeCollection.freiendlyname ?? $activeCollection.name}</div>
            </nav>

            <div class="inline-flex gap-5">
                <RefreshButton
                    on:refresh={() => {
                        recordsList?.load();
                        recordsCount?.reload();
                    }}
                />
            </div>

            <div class="btns-group">

                {#if $activeCollection.type !== "view"}
                    <button type="button" class="btn btn-expanded" on:click={() => recordUpsertPanel?.show()}>
                        <i class="ri-add-line" />
                        <span class="txt">Datensatz erstellen</span>
                    </button>
                {/if}
            </div>
        </header>

        <Searchbar
            bind:this={searchBar}
            value={filter}
            autocompleteCollection={$activeCollection}
            on:submit={(e) => (filter = e.detail)}
        />

        <div class="clearfix m-b-sm" />

        <RecordsList
            bind:this={recordsList}
            collection={$activeCollection}
            bind:filter
            bind:sort
            crossReferences={$crossReferences}
            on:select={(e) => {
                updateQueryParams({
                    recordId: e.detail.id,
                });

                let showModel = e.detail._partial ? e.detail.id : e.detail;

                $activeCollection.type === "view"
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
                collection={$activeCollection}
                {filter}
                bind:totalCount
            />
        </svelte:fragment>
    </PageWrapper>
{/if}

<RecordUpsertPanel
    bind:this={recordUpsertPanel}
    collection={$activeCollection}
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
    collection={$activeCollection}
    on:hide={() => {
        updateQueryParams({ recordId: null });
    }}
/>
