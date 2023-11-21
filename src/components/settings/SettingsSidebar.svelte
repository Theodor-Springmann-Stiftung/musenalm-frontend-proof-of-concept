<script>
    import { link } from "svelte-spa-router";
    import active from "svelte-spa-router/active";
    import { admin } from "@/stores/admin";
    import PageSidebar from "@/components/base/PageSidebar.svelte";
</script>

<PageSidebar class="settings-sidebar">
    <div class="sidebar-content">
        <div class="sidebar-title">System</div>
        <a href="/admin/settings" class="sidebar-list-item" use:active={{ path: "/admin/settings" }} use:link>
            <i class="ri-home-gear-line" />
            <span class="txt">Application</span>
        </a>
        <a
            href="/admin/settings/admins"
            class="sidebar-list-item"
            use:active={{ path: "/admin/settings/admins/?.*" }}
            use:link
        >
            <i class="ri-shield-user-line" />
            <span class="txt">Accounts</span>
        </a>
    </div>
</PageSidebar>
