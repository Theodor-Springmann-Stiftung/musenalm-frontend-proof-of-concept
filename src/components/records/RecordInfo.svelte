<script>
    import CommonHelper from "@/utils/CommonHelper";
    import tooltip from "@/actions/tooltip";
    import { collections } from "@/stores/collections";
    import RecordFileThumb from "@/components/records/RecordFileThumb.svelte";
    import RecordContextMenu from "./RecordContextMenu.svelte";
    import RecordFieldValue from "./RecordFieldValue.svelte";
    import { clickOutside } from "@/actions/clickoutside";

    export let record;
    export let menu;

    let contextmenu;

    $: collection = $collections?.find((item) => item.id == record?.collectionId);

    $: fileDisplayFields =
        collection?.schema?.filter((f) => f.presentable && f.type == "file")?.map((f) => f.name) || [];

    $: textDisplayFields =
        collection?.schema?.filter((f) => f.presentable && f.type != "file")?.map((f) => f.name) || [];

    $: displayValue = CommonHelper.displayValue(record, textDisplayFields);
</script>

<div class="record-info">
    <!-- <i
        class="link-hint txt-sm ri-information-line"
        use:tooltip={{
            text: CommonHelper.truncate(
                JSON.stringify(CommonHelper.truncateObject(record), null, 2),
                800,
                true
            ),
            class: "code",
            position: "left",
        }}
    /> -->

    {#each fileDisplayFields as name}
        {@const filenames = CommonHelper.toArray(record[name]).slice(0, 5)}
        {#each filenames as filename}
            {#if !CommonHelper.isEmpty(filename)}
                <RecordFileThumb {record} {filename} size="xs" />
            {/if}
        {/each}
    {/each}

    <span
        class="txt txt-ellipsis"
        on:click={(_) => {
            if (contextmenu) {
                contextmenu.toggle();
            }
        }}
        use:clickOutside
        on:click_outside|preventDefault={(_) => {
            if (contextmenu) {
                contextmenu.hide();
            }}}
    >
        <span use:tooltip={displayValue.length > 60 ? displayValue : ""}>
            {CommonHelper.truncate(displayValue, 60)}
        </span>
        {#if menu}
            <RecordContextMenu bind:this={contextmenu} {record} {menu} />
        {/if}
    </span>
</div>

<style lang="scss">
    .record-info {
        display: inline-flex;
        vertical-align: top;
        align-items: center;
        max-width: 100%;
        min-width: 0;
        gap: 5px;
        line-height: normal;
        > * {
            line-height: inherit;
        }
        :global(.thumb) {
            box-shadow: none;
        }
    }
</style>
