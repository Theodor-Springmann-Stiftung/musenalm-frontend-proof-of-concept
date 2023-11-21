<script>
    import { replace } from "svelte-spa-router";
    import PocketBase from "@/utils/ApiClient";

    handler();

    function handler() {
        if (PocketBase.authStore.isValid) {
            replace("/admin/collections");
        } else {
            PocketBase.logout(true);
        }
    }
</script>
