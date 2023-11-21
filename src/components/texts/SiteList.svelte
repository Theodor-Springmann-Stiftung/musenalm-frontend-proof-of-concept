<script>
    import { createEventDispatcher } from "svelte";
    import ApiClient from "@/utils/ApiClient";
    import CommonHelper from "@/utils/CommonHelper";
    import tooltip from "@/actions/tooltip";
    import SortHeader from "@/components/base/SortHeader.svelte";
    import Field from "@/components/base/Field.svelte";
    import CopyIcon from "@/components/base/CopyIcon.svelte";
    import FormattedDate from "@/components/base/FormattedDate.svelte";
    import Scroller from "@/components/base/Scroller.svelte";
    import RecordFieldValue from "@/components/records/RecordFieldValue.svelte";
    import { replace, link } from "svelte-spa-router";

    const dispatch = createEventDispatcher();

    export let collection;
    export let sort = "";
    export let filter = "";

    let scrollWrapper;
    let records = [];
    let isLoading = true;
    let yieldedRecordsId = 0;

    $: if (collection?.id) {
        clearList();
    }

    // Whether its a view / auth collection
    $: isView = collection?.type === "view";

    // Fields which are the basis for viewing / hiding etc
    $: fields = collection?.schema || [];
    $: editorFields = fields.filter((field) => field.type === "editor");

    // Columns that are visible
    $: visibleFields = [].concat(
        collection.columns.filter(
            (field) => !(field.hidden && field.hidden === true)
        )
    );

    $: if (collection?.id && sort !== -1 && filter !== -1) {
        load(1);
    }

    export function hasRecord(id) {
        return !!records.find((r) => r.id);
    }

    // Basic load function
    export async function load(page = 1, breakTasks = true) {
        isLoading = true;

        const fallbackSearchFields = [].concat(
            CommonHelper.getAllCollectionIdentifiers(collection),
            CommonHelper.getAdditionalCollectionSearchfields(collection)
        );

        return ApiClient.collection(collection.name)
            .getList(1, 1000, {
                sort: sort,
                skipTotal: 1,
                filter: CommonHelper.normalizeSearchFilter(filter, fallbackSearchFields),
                requestKey: "records_list",
            })
            .then(async (result) => {
                if (page <= 1) {
                    clearList();
                }

                isLoading = false;

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
    }
</script>

<Scroller bind:this={scrollWrapper} class="table-wrapper">
    <table class="table" class:table-loading={isLoading}>
        <thead>
            <tr>
                {#if isLoading}
                    <th class="bulk-select-col min-width"> <span class="loader loader-sm" /></th>
                {/if}

                <SortHeader class="col-type-text col-field-id small-column" name="id" bind:sort>
                    <div class="col-header-content">
                        <i class={CommonHelper.getFieldTypeIcon("primary")} />
                        <span class="txt">id</span>
                    </div>
                </SortHeader>

                {#each visibleFields as field (field.name)}
                    <SortHeader
                        class="col-type-{field.type} col-field-{field.name} {field.class ?? field.class}"
                        name={field.sortProxy ?? field.name}
                        bind:sort
                    >
                        <div class="col-header-content">
                            <i class={CommonHelper.getFieldTypeIcon(field.type)} />
                            <span class="txt">{field.friendlyName ?? field.name}</span>
                        </div>
                    </SortHeader>
                {/each}

                <SortHeader class="col-type-date col-field-created" name="created" bind:sort>
                    <div class="col-header-content">
                        <i class={CommonHelper.getFieldTypeIcon("date")} />
                        <span class="txt">Erstellt</span>
                    </div>
                </SortHeader>

                <SortHeader class="col-type-date col-field-updated" name="updated" bind:sort>
                    <div class="col-header-content">
                        <i class={CommonHelper.getFieldTypeIcon("date")} />
                        <span class="txt">Bearbeitet</span>
                    </div>
                </SortHeader>

                <th>

                </th>
            </tr>
        </thead>
        <tbody>
            {#each records as record (!isView ? record.id : record)}
                <tr tabindex="0" class="row-handle">

                    <td class="col-type-text col-field-id small-column">
                        <div class="flex flex-gap-5">
                            <div class="label">
                                <CopyIcon value={record.id} />
                                <div class="txt">{record.id}</div>
                            </div>
                        </div>
                    </td>

                    {#each visibleFields as field (field.name)}
                        <td class="col-type-{field.type} col-field-{field.name} {field.class ?? field.class}">
                            {#if field.fields}
                                <div class="col-type-multiple">
                                    {#each field.fields as f (f.name)}
                                        {#if record?.[f.field] && record?.[f.field].length}
                                            <RecordFieldValue
                                                short
                                                {record}
                                                field={f}
                                                menu={field?.menu ?? null}
                                                multifield={true}
                                            />
                                        {/if}
                                    {/each}
                                </div>
                            {:else}
                                <RecordFieldValue short menu={field?.menu ?? null} {record} {field} />
                            {/if}
                            {#if field.badge}
                                {#if field.badge.type === "bool" && record?.[field.badge.field] === true}
                                    <div
                                        class="badge"
                                        use:tooltip={field.badge.tooltip ??
                                            field.badge.friendlyName ??
                                            field.badge.field}
                                    >
                                        {#if field.badge.icon}
                                            <i class="{field.badge.icon} txt-sm txt-success" />
                                        {/if}
                                        {#if field.badge.text}
                                            {field.badge.text}
                                        {/if}
                                    </div>
                                {/if}
                                {#if field.badge.type === "select" && record?.[field.badge.field] && record?.[field.badge.field] !== ""}
                                    <div
                                        class="badge"
                                        use:tooltip={field.badge.tooltip ??
                                            field.badge.friendlyName ??
                                            field.badge.field}
                                    >
                                        {#if field.badge.icon}
                                            <i class="{field.badge.icon} txt-sm txt-success" />
                                        {/if}
                                        {record?.[field.badge.field]}
                                    </div>
                                {/if}
                            {/if}
                        </td>
                    {/each}

                    <td class="col-type-date col-field-created">
                        <FormattedDate date={record.created} />
                    </td>

                    <td class="col-type-date col-field-updated">
                        <FormattedDate date={record.updated} />
                    </td>

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
        </tbody>
    </table>
</Scroller>