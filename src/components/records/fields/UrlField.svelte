<script>
    import CommonHelper from "@/utils/CommonHelper";
    import Field from "@/components/base/Field.svelte";

    export let field;
    export let value = undefined;
</script>

<Field class="form-field {field.required ? 'required' : ''}" name={field.name} let:uniqueId>
    <label for={uniqueId}>
        <i class={CommonHelper.getFieldTypeIcon(field.type)} />
        <span class="txt">{field.friendlyName ?? field.name}</span>
    </label>
    <input type="url" id={uniqueId} required={field.required} bind:value />
</Field>
