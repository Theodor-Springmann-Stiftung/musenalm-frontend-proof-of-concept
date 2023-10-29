<script>
    import tooltip from "@/actions/tooltip";
    import CommonHelper from "@/utils/CommonHelper";

    export let date = "";

    $: dateOnly = date ? CommonHelper.formatToLocalDate(date).substring(0, 10) : null;

    $: timeOnly = date ? CommonHelper.formatToLocalDate(date).substring(10, 19) : null;

    const tooltipData = {
        // generate the tooltip text as getter to speed up the initial load
        // in case the component is used with large number of items
        get text() {
            console.log(date);
            return CommonHelper.formatToLocalDate(date) + " Local";
        },
    };
</script>

{#if date}
    <div class="datetime" use:tooltip={tooltipData}>
        <div class="date">{dateOnly}</div>
        <div class="time">{timeOnly} EMT</div>
    </div>
{:else}
    <span class="txt txt-hint">N/A</span>
{/if}

<style>
    .datetime {
        display: inline-block;
        vertical-align: top;
        white-space: nowrap;
        line-height: var(--smLineHeight);
    }
    .time {
        font-size: var(--smFontSize);
        color: var(--txtHintColor);
    }
</style>
