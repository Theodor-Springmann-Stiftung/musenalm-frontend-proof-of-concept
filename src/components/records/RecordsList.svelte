<script>
    import { createEventDispatcher } from "svelte";
    import { fly } from "svelte/transition";
    import ApiClient from "@/utils/ApiClient";
    import CommonHelper from "@/utils/CommonHelper";
    import tooltip from "@/actions/tooltip";
    import { confirm } from "@/stores/confirmation";
    import { addSuccessToast } from "@/stores/toasts";
    import { collections } from "@/stores/collections";
    import SortHeader from "@/components/base/SortHeader.svelte";
    import Toggler from "@/components/base/Toggler.svelte";
    import Field from "@/components/base/Field.svelte";
    import CopyIcon from "@/components/base/CopyIcon.svelte";
    import FormattedDate from "@/components/base/FormattedDate.svelte";
    import Scroller from "@/components/base/Scroller.svelte";
    import RecordFieldValue from "@/components/records/RecordFieldValue.svelte";
    import { replace, link } from "svelte-spa-router";

    const dispatch = createEventDispatcher();
    const sortRegex = /^([\+\-])?(\w+)$/;
    const perPage = 40;

    export let collection;
    export let sort = "";
    export let filter = "";

    let scrollWrapper;
    let records = [];
    let currentPage = 1;
    let lastTotal = 0;
    let bulkSelected = {};
    let isLoading = true;
    let isDeleting = false;
    let yieldedRecordsId = 0;
    let columnsTrigger;
    let hiddenColumns = [];
    let collumnsToHide = [];
    let hiddenColumnsKey = "";

    $: if (collection?.id) {
        hiddenColumnsKey = collection.id + "@hiddenColumns";
        loadStoredHiddenColumns();
        clearList();
    }

    // Whether its a view / auth collection
    $: isView = collection?.type === "view";
    $: isAuth = collection?.type === "auth";

    // Fields which are the basis for viewing / hiding etc
    $: fields = collection?.schema || [];
    $: editorFields = fields.filter((field) => field.type === "editor");
    $: relFields = fields.filter((field) => field.type === "relation");

    // ViewData
    $: viewdata = collection ? CommonHelper.loadViewDataOf(collection) : {};

    // Columns that are visible
    $: visibleFields = [].concat(
        fields.filter(
            (field) =>
                    !hiddenColumns.includes(field.id) &&
                    !(field.hidden && field.hidden === true)
        ),
    );

    $: if (hiddenColumns !== -1) {
        updateStoredHiddenColumns();
    }

    // Fields that are selectable in the "Hide/Show columns panel"
    $: collumnsToHide = [].concat(
        { id: "@id", name: "ID" },
        isAuth
            ? [
                  { id: "@username", name: "username" },
                  { id: "@email", name: "email" },
              ]
            : [],
        fields
            .filter((x) => 
                !(x.hidden && x.hidden === true))
            .map((f) => {
                return { id: f.id, name: f.friendlyName ?? f.name };
            }),
        hasCreated ? { id: "@created", name: "Erstellt" } : [],
        hasUpdated ? { id: "@updated", name: "Bearbeitet" } : [],
    );

    $: if (collection?.id && sort !== -1 && filter !== -1) {
        load(1);
    }

    // if there is more data to load
    $: canLoadMore = lastTotal >= perPage;

    // count of selected objects
    $: totalBulkSelected = Object.keys(bulkSelected).length;

    // if all records are selected
    $: areAllRecordsSelected = records.length && totalBulkSelected === records.length;

    
    $: hasCreated = !isView || (records.length > 0 && typeof records[0].created != "undefined");
    $: hasUpdated = !isView || (records.length > 0 && typeof records[0].updated != "undefined");

    function updateStoredHiddenColumns() {
        if (!collection?.id) {
            return;
        }

        if (hiddenColumns.length) {
            localStorage.setItem(hiddenColumnsKey, JSON.stringify(hiddenColumns));
        } else {
            localStorage.removeItem(hiddenColumnsKey);
        }
    }

    function loadStoredHiddenColumns() {
        hiddenColumns = [];

        if (!collection?.id) {
            return;
        }

        try {
            const encoded = localStorage.getItem(hiddenColumnsKey);
            if (encoded) {
                hiddenColumns = JSON.parse(encoded) || [];
            }
        } catch (_) {}
    }

    export function hasRecord(id) {
        return !!records.find((r) => r.id);
    }

    export async function reloadLoadedPages() {
        const loadedPages = currentPage;

        for (let i = 1; i <= loadedPages; i++) {
            if (i === 1 || canLoadMore) {
                await load(i, false);
            }
        }
    }


    // Basic load function
    export async function load(page = 1, breakTasks = true) {
        if (!collection?.id) {
            return;
        }

        isLoading = true;

        // allow sorting by the relation display fields
        let listSort = sort;
        const sortMatch = listSort.match(sortRegex);
        const sortRelField = sortMatch ? relFields.find((f) => f.name === sortMatch[2]) : null;
        if (sortMatch && sortRelField) {
            const relPresentableFields =
                $collections
                    ?.find((c) => c.id == sortRelField.options?.collectionId)
                    ?.schema?.filter((f) => f.presentable)
                    ?.map((f) => f.name) || [];

            const parts = [];
            for (const presentableField of relPresentableFields) {
                parts.push((sortMatch[1] || "") + sortMatch[2] + "." + presentableField);
            }
            if (parts.length > 0) {
                listSort = parts.join(",");
            }
        }

        const fallbackSearchFields = CommonHelper.getAllCollectionIdentifiers(collection);

        const listFields = editorFields
            // Getting just 200 characters of an "Editor field"
            .map((f) => f.name + ":excerpt(200)")
            // Getting & expanding relational Fields
            .concat(relFields.map((field) => "expand." + field.name + ".*:excerpt(200)"));
        if (listFields.length) {
            listFields.unshift("*");
        }

        return ApiClient.collection(collection.name)
            .getList(page, perPage, {
                sort: listSort,
                skipTotal: 1,
                filter: CommonHelper.normalizeSearchFilter(filter, fallbackSearchFields),
                expand: relFields.map((field) => field.name).join(","),
                fields: listFields.join(","),
                requestKey: "records_list",
            })
            .then(async (result) => {
                if (page <= 1) {
                    clearList();
                }

                isLoading = false;
                currentPage = result.page;
                lastTotal = result.items.length;

                // LOAD event
                dispatch("load", records.concat(result.items));

                // mark the records as "partial" because of the excerpt
                if (editorFields.length) {
                    for (let record of result.items) {
                        record._partial = true;
                    }
                }

                // optimize the records listing by rendering the rows in task batches
                if (breakTasks) {
                    const currentYieldId = ++yieldedRecordsId;
                    while (result.items?.length) {
                        if (yieldedRecordsId != currentYieldId) {
                            break; // new yield has been started
                        }

                        records = records.concat(result.items.splice(0, 20));

                        await CommonHelper.yieldToMain();
                    }
                } else {
                    records = records.concat(result.items);
                }
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

    function clearList() {
        scrollWrapper?.resetVerticalScroll();
        records = [];
        currentPage = 1;
        lastTotal = 0;
        bulkSelected = {};
    }

    function toggleSelectAllRecords() {
        if (areAllRecordsSelected) {
            deselectAllRecords();
        } else {
            selectAllRecords();
        }
    }

    function deselectAllRecords() {
        bulkSelected = {};
    }

    function selectAllRecords() {
        for (const record of records) {
            bulkSelected[record.id] = record;
        }
        bulkSelected = bulkSelected;
    }

    function toggleSelectRecord(record) {
        if (!bulkSelected[record.id]) {
            bulkSelected[record.id] = record;
        } else {
            delete bulkSelected[record.id];
        }

        bulkSelected = bulkSelected; // trigger reactivity
    }

    function deleteSelectedConfirm() {
        const msg = `Möchten Sie ${
            totalBulkSelected === 1 ? "den ausgewählten Datensatz" : "die ausgewählten Datensätze"
        } wirklich löschen?`;

        confirm(msg, deleteSelected);
    }

    async function deleteSelected() {
        if (isDeleting || !totalBulkSelected || !collection?.id) {
            return;
        }

        let promises = [];
        for (const recordId of Object.keys(bulkSelected)) {
            promises.push(ApiClient.collection(collection.id).delete(recordId));
        }

        isDeleting = true;

        return Promise.all(promises)
            .then(() => {
                addSuccessToast(
                    `${
                        totalBulkSelected === 1
                            ? "Der Datensatz wurde"
                            : "Die Datensätze wurden"
                    } gelöscht.`
                );

                dispatch("delete", bulkSelected);

                deselectAllRecords();
            })
            .catch((err) => {
                ApiClient.error(err);
            })
            .finally(() => {
                isDeleting = false;

                // always reload because some of the records may not be deletable
                return reloadLoadedPages();
            });
    }
</script>

<Scroller bind:this={scrollWrapper} class="table-wrapper">
    <svelte:fragment slot="before">
        {#if columnsTrigger}
            <Toggler
                class="dropdown dropdown-right dropdown-nowrap columns-dropdown"
                trigger={columnsTrigger}
            >
                <div class="txt-hint txt-sm p-5 m-b-5">Spalten ein-/ausblenden</div>
                {#each collumnsToHide as column (column.id + column.name)}
                    <Field class="form-field form-field-sm form-field-toggle m-0 p-5" let:uniqueId>
                        <input
                            type="checkbox"
                            id={uniqueId}
                            checked={!hiddenColumns.includes(column.id)}
                            on:change={(e) => {
                                if (e.target.checked) {
                                    CommonHelper.removeByValue(hiddenColumns, column.id);
                                } else {
                                    CommonHelper.pushUnique(hiddenColumns, column.id);
                                }
                                // Here the local store save needs to be triggered by a set:
                                hiddenColumns = hiddenColumns;
                            }}
                        />
                        <label for={uniqueId}>{column.name}</label>
                    </Field>
                {/each}
            </Toggler>
        {/if}
    </svelte:fragment>

    <table class="table" class:table-loading={isLoading}>
        <thead>
            <tr>
                {#if !isView}
                    <th class="bulk-select-col min-width">
                        {#if isLoading}
                            <span class="loader loader-sm" />
                        {:else}
                            <div class="form-field">
                                <input
                                    type="checkbox"
                                    id="checkbox_0"
                                    disabled={!records.length}
                                    checked={areAllRecordsSelected}
                                    on:change={() => toggleSelectAllRecords()}
                                />
                                <label for="checkbox_0" />
                            </div>
                        {/if}
                    </th>
                {/if}

                <!-- {#if iconcolumns.length}
                {#each iconcolumns as iconcolumn (iconcolumn.name)}
                    {#if !hiddenColumns.includes(iconcolumn.id)}
                    <th class="icon-col min-width">
                        <i class="{iconcolumn.iconcolumn.icon}"
                        use:tooltip={iconcolumn.iconcolumn.tooltip}/>
                    </th>
                    {/if}
                {/each}
                {/if} -->

                {#if !hiddenColumns.includes("@id")}
                    <SortHeader class="col-type-text col-field-id" name="id" bind:sort>
                        <div class="col-header-content">
                            <i class={CommonHelper.getFieldTypeIcon("primary")} />
                            <span class="txt">id</span>
                        </div>
                    </SortHeader>
                {/if}

                {#if isAuth}
                    {#if !hiddenColumns.includes("@username")}
                        <SortHeader class="col-type-text col-field-id" name="username" bind:sort>
                            <div class="col-header-content">
                                <i class={CommonHelper.getFieldTypeIcon("user")} />
                                <span class="txt">username</span>
                            </div>
                        </SortHeader>
                    {/if}
                    {#if !hiddenColumns.includes("@email")}
                        <SortHeader class="col-type-email col-field-email" name="email" bind:sort>
                            <div class="col-header-content">
                                <i class={CommonHelper.getFieldTypeIcon("email")} />
                                <span class="txt">email</span>
                            </div>
                        </SortHeader>
                    {/if}
                {/if}

                {#each visibleFields as field (field.name)}
                    <SortHeader
                        class="col-type-{field.type} col-field-{field.name}"
                        name={field.name}
                        bind:sort
                    >
                        <div class="col-header-content">
                            <i class={CommonHelper.getFieldTypeIcon(field.type)} />
                            <span class="txt">{field.friendlyName ?? field.name}</span>
                        </div>
                    </SortHeader>
                {/each}

                {#if hasCreated && !hiddenColumns.includes("@created")}
                    <SortHeader class="col-type-date col-field-created" name="created" bind:sort>
                        <div class="col-header-content">
                            <i class={CommonHelper.getFieldTypeIcon("date")} />
                            <span class="txt">Erstellt</span>
                        </div>
                    </SortHeader>
                {/if}

                {#if hasUpdated && !hiddenColumns.includes("@updated")}
                    <SortHeader class="col-type-date col-field-updated" name="updated" bind:sort>
                        <div class="col-header-content">
                            <i class={CommonHelper.getFieldTypeIcon("date")} />
                            <span class="txt">Bearbeitet</span>
                        </div>
                    </SortHeader>
                {/if}

                <th class="col-type-action min-width">
                    {#if collumnsToHide.length}
                        <button
                            bind:this={columnsTrigger}
                            type="button"
                            aria-label="Spalten ein-/ausblenden"
                            class="btn btn-sm btn-transparent p-0"
                            use:tooltip={"Spalten ein-/ausblenden"}
                        >
                            <i class="ri-more-line" />
                        </button>
                    {/if}
                </th>
            </tr>
        </thead>
        <tbody>
            {#each records as record (!isView ? record.id : record)}
                <tr tabindex="0" class="row-handle">
                    {#if !isView}
                        <td class="bulk-select-col min-width bulk-select-checkbox">
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                            <div class="form-field" on:click|stopPropagation>
                                <input
                                    type="checkbox"
                                    id="checkbox_{record.id}"
                                    checked={bulkSelected[record.id]}
                                    on:change={() => toggleSelectRecord(record)}
                                />
                                <label for="checkbox_{record.id}" />
                            </div>
                        </td>
                    {/if}

                    <!-- {#if iconcolumns.length}
                    {#each iconcolumns as iconcolumn (iconcolumn.name)}
                    {#if !hiddenColumns.includes(iconcolumn.id)}
                        <td class="icon-col min-width">
                            {#if record?.[iconcolumn.name]}
                                <i class="{iconcolumn.iconcolumn.icon}"
                                use:tooltip={iconcolumn.iconcolumn.tooltip}/>
                            {/if}
                        </td>
                    {/if}
                    {/each}
                    {/if} -->

                    {#if !hiddenColumns.includes("@id")}
                        <td class="col-type-text col-field-id">
                            <div class="flex flex-gap-5">
                                <div class="label">
                                    <CopyIcon value={record.id} />
                                    <div class="txt">{record.id}</div>
                                </div>

                                {#if isAuth}
                                    {#if record.verified}
                                        <i
                                            class="ri-checkbox-circle-fill txt-sm txt-success"
                                            use:tooltip={"Bestätigt"}
                                        />
                                    {:else}
                                        <i
                                            class="ri-error-warning-fill txt-sm txt-hint"
                                            use:tooltip={"Undbestätigt"}
                                        />
                                    {/if}
                                {/if}
                            </div>
                        </td>
                    {/if}

                    {#if isAuth}
                        {#if !hiddenColumns.includes("@username")}
                            <td class="col-type-text col-field-username">
                                {#if CommonHelper.isEmpty(record.username)}
                                    <span class="txt-hint">N/A</span>
                                {:else}
                                    <span class="txt txt-ellipsis" title={record.username}>
                                        {record.username}
                                    </span>
                                {/if}
                            </td>
                        {/if}
                        {#if !hiddenColumns.includes("@email")}
                            <td class="col-type-text col-field-email">
                                {#if CommonHelper.isEmpty(record.email)}
                                    <span class="txt-hint">N/A</span>
                                {:else}
                                    <span class="txt txt-ellipsis" title={record.email}>
                                        {record.email}
                                    </span>
                                {/if}
                            </td>
                        {/if}
                    {/if}

                    {#each visibleFields as field (field.name)}
                        <td class="col-type-{field.type} col-field-{field.name}">
                            <!-- {#each getBadge(field.name , "before") as b (b.name)}
                                {#if b.type === "bool" && record?.[b.name] === true}
                                    <div class="badge" use:tooltip={b.badge.tooltip ?? b.friendlyName ?? b.name}>
                                        {#if b.badge.icon}
                                            <i class="{b.badge.icon} txt-sm txt-success" />
                                        {/if}
                                        {#if b.badge.text}
                                            {b.badge.text}
                                        {/if}
                                    </div>
                                {/if}
                            {/each} -->

                            <RecordFieldValue short {record} {field} />

                            <!-- {#each getBadge(field.name , "after") as b (b.name)}
                                {#if b.type === "bool" && record?.[b.name] === true}
                                    <div class="badge" use:tooltip={b.badge.tooltip ?? b.friendlyName ?? b.name}>
                                        {#if b.badge.icon}
                                            <i class="{b.badge.icon} txt-sm txt-success" />
                                        {/if}
                                        {#if b.badge.text}
                                            {b.badge.text}
                                        {/if}
                                    </div>
                                {/if}
                            {/each} -->
                        </td>
                    {/each}

                    {#if hasCreated && !hiddenColumns.includes("@created")}
                        <td class="col-type-date col-field-created">
                            <FormattedDate date={record.created} />
                        </td>
                    {/if}

                    {#if hasUpdated && !hiddenColumns.includes("@updated")}
                        <td class="col-type-date col-field-updated">
                            <FormattedDate date={record.updated} />
                        </td>
                    {/if}

                    <td class="col-type-action min-width">
                        <div class="col-actions">
                            <button
                                type="button"
                                aria-label="Eintrag bearbeiten"
                                use:tooltip={"bearbeiten"}
                                class="btn btn-sm btn-transparent p-0"
                                on:click={() => dispatch("select", record)}
                                on:keydown={(e) => {
                                    if (e.code === "Enter") {
                                        e.preventDefault();
                                        dispatch("select", record);
                                    }
                                }}
                            >
                                <i class="ri-pencil-fill" use:tooltip={"Bearbeiten"} />
                            </button>

                            {#if crossReferences && crossReferences.length}
                                {#each crossReferences as cr}
                                    <a
                                        type="button"
                                        aria-label="verküpfte {cr.friendlyName ?? cr.table}"
                                        use:tooltip={cr.friendlyName ?? cr.table}
                                        class="btn btn-sm btn-transparent p-0"
                                        href="/collections?collectionId={cr.id}&filter={CommonHelper.createFilterLink(
                                            record.id,
                                            cr.fields
                                        )}&sort={cr.sort ?? "-created"}"
                                        use:link
                                    >
                                        <i class={cr.icon} />
                                    </a>
                                {/each}
                            {/if}
                        </div>
                    </td>
                </tr>
            {:else}
                {#if isLoading}
                    <tr>
                        <td colspan="99" class="p-xs">
                            <span class="skeleton-loader m-0" />
                        </td>
                    </tr>
                {:else}
                    <tr>
                        <td colspan="99" class="txt-center txt-hint p-xs">
                            <h6>Keine Einträge gefunden.</h6>
                            {#if filter?.length}
                                <button
                                    type="button"
                                    class="btn btn-warning btn-expanded m-t-sm"
                                    on:click={() => (filter = "")}
                                >
                                    <span class="txt">Filter zurücksetzen</span>
                                </button>
                            {:else if !isView}
                                <button
                                    type="button"
                                    class="btn btn-secondary btn-expanded m-t-sm"
                                    on:click={() => dispatch("new")}
                                >
                                    <i class="ri-add-line" />
                                    <span class="txt">Datensatz erstellen</span>
                                </button>
                            {/if}
                        </td>
                    </tr>
                {/if}
            {/each}

            {#if records.length && canLoadMore}
                <tr>
                    <td colspan="99" class="txt-center">
                        <button
                            class="btn btn-expanded-lg btn-secondary btn-horizontal-sticky"
                            disabled={isLoading}
                            class:btn-loading={isLoading}
                            on:click|preventDefault={() => load(currentPage + 1)}
                        >
                            <span class="txt">Mehr Einträge laden</span>
                        </button>
                    </td>
                </tr>
            {/if}
        </tbody>
    </table>
</Scroller>

{#if totalBulkSelected}
    <div class="bulkbar" transition:fly={{ duration: 150, y: 5 }}>
        <div class="txt">
            <strong>{totalBulkSelected}</strong>
            {totalBulkSelected === 1 ? "Datensatz" : "Datensätze"} ausgewählt
        </div>
        <button
            type="button"
            class="btn btn-xs btn-transparent btn-secondary p-l-5 p-r-5"
            class:btn-disabled={isDeleting}
            on:click={() => deselectAllRecords()}
        >
            <span class="txt">Zurücksetzen</span>
        </button>
        <div class="flex-fill" />
        <button
            type="button"
            class="btn btn-sm btn-transparent btn-danger"
            class:btn-loading={isDeleting}
            class:btn-disabled={isDeleting}
            on:click={() => deleteSelectedConfirm()}
        >
            <span class="txt">Löschen</span>
        </button>
    </div>
{/if}
