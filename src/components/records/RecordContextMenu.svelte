<script>
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import Router, { replace, link } from "svelte-spa-router";
    import { collections } from "@/stores/collections";
    import CommonHelper from "@/utils/CommonHelper";

    export let record = {};
    export let menu = {};
    export let active = false;

    export function toggle() {
        active = !active;
    }

    export function show() {
        active = true;
    }

    export function hide(event) {
        active = false;
    }

    export function isActive() {
        return active;
    }

    onMount(() => {
        const handleEscape = (event) => {
            if (active && event.key === "Escape") {
                active = false;
            }
        };

        // add events when element is added to the DOM
        document.addEventListener("keyup", handleEscape, false);

        // remove events when element is removed from the DOM
        return () => {
            document.removeEventListener("keyup", handleEscape, false);
        };
    });
</script>

<div class="context-menu-container">
    {#if active}
        <div class="context-menu" in:fly={{ duration: 150, y: 30 }} out:fly={{ duration: 150, y: -30 }}>
            {#each menu as item}
                <div class="context-menu-item">
                    <div class="context-menu-desc" />
                    <a
                        class="context-menu-text"
                        href="/collections?collectionId={CommonHelper.getCollectionIDByName(
                            $collections,
                            item.table
                        )}&filter={CommonHelper.createFilterLink(record, item)}&sort={item.sort ?? '-created'}"
                        use:link
                    >
                        {item.tooltip}
                    </a>
                </div>
            {/each}
        </div>
    {/if}
</div>
