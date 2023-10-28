<script>
    import { link } from "svelte-spa-router";
    import active from "svelte-spa-router/active";
    import PageSidebar from "@/components/base/PageSidebar.svelte";
</script>

<PageSidebar class="settings-sidebar">
    <div class="sidebar-content">
        <div class="sidebar-title">System</div>
        <a href="/settings" class="sidebar-list-item" use:active={{ path: "/settings" }} use:link>
            <i class="ri-home-gear-line" />
            <span class="txt">Application</span>
        </a>
        <a
            href="/settings/admins"
            class="sidebar-list-item"
            use:active={{ path: "/settings/admins/?.*" }}
            use:link
        >
            <i class="ri-shield-user-line" />
            <span class="txt">Admins</span>
        </a>
    </div>
</PageSidebar>
