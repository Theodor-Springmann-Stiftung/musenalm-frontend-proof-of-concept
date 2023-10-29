<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { fly } from "svelte/transition";
    import CommonHelper from "@/utils/CommonHelper";

    const dispatch = createEventDispatcher();
    const uniqueId = "search_" + CommonHelper.randomString(7);

    export let value = "";
    export let placeholder = 'Such- oder Filterbegriff (wie Name ENTHÄLT "Lichtenberg")...';

    // autocomplete filter component fields
    export let autocompleteCollection = CommonHelper.initCollection();
    export let extraAutocompleteKeys = [];

    let filterComponent;
    let isFilterComponentLoading = false;

    let searchInput;
    let tempValue = "";

    let currFilterComponent;

    $: if (typeof value === "string") {
        tempValue = value;
    }

    export function clear(focusInput = true) {
        tempValue = "";
        if (focusInput) {
            searchInput?.focus();
        } if (currFilterComponent) {
            currFilterComponent?.focus();
        }
        dispatch("clear");
    }

    function submit() {
        value = tempValue;
        dispatch("submit", value);
    }

    async function loadFilterComponent() {
        if (filterComponent || isFilterComponentLoading) {
            return; // already loaded or in the process
        }

        isFilterComponentLoading = true;

        filterComponent = (await import("@/components/base/FilterAutocompleteInput.svelte")).default;

        isFilterComponentLoading = false;
    }

    onMount(() => {
        loadFilterComponent();
    });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<form class="searchbar" on:click|stopPropagation on:submit|preventDefault={submit}>
    <label for={uniqueId} class="m-l-10 txt-xl">
        <i class="ri-search-line" />
    </label>

    {#if filterComponent && !isFilterComponentLoading}
        <svelte:component
            this={filterComponent}
            id={uniqueId}
            singleLine={true},
            autoFocus={true},
            disableRequestKeys
            disableIndirectCollectionsKeys
            {extraAutocompleteKeys}
            baseCollection={autocompleteCollection}
            placeholder={value || placeholder}
            bind:value={tempValue}
            on:submit={submit}
            bind:this={currFilterComponent}
        />
    {:else}
        <!-- svelte-ignore a11y-autofocus -->
        <input
            bind:this={searchInput}
            type="text"
            id={uniqueId}
            placeholder={value || placeholder}
            bind:value={tempValue}
            autofocus
        />
    {/if}

    {#if (value.length || tempValue.length) && tempValue != value}
        <button
            type="submit"
            class="btn btn-expanded-sm btn-sm "
            transition:fly={{ duration: 150, x: 5 }}
        >
            <span class="txt">Suchen</span>
        </button>
    {/if}

    {#if value.length || tempValue.length}
        <button
            type="button"
            class="btn btn-outline btn-secondary btn-sm  p-l-xs p-r-xs m-l-10"
            transition:fly={{ duration: 150, x: 5 }}
            on:click={() => {
                clear(true);
                submit();
            }}
        >
            <span class="txt">Filter zurücksetzen</span>
        </button>
    {/if}
</form>
