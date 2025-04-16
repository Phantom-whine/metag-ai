<script>
    import Sidebar from "$lib/components/dashboard/Sidebar.svelte";
    import Cookies from "js-cookie";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    let { data } = $props();
    let profile_url = $state();
    let showSidebar = $state(true);

    onMount(() => {
        profile_url = Cookies.get("profile");
    });
</script>

<div class="flex">
    {#if browser}
        {#if !window.location.href.includes("onboarding")}
            <div class="sidebar-fixed hidden lg:fixed">
                <Sidebar
                    name={data.user.fullname}
                    image={profile_url}
                    email={data.user.email}
                    bind:collapsed={showSidebar}
                />
            </div>
        {/if}
    {/if}

    <div
        class="flex-1 transition"
        class:main-content-with-sidebar={!showSidebar}
        class:main-content-with-sidebar-collapsed={showSidebar}
    >
        <slot />
    </div>
</div>

<style>
    /* Sidebar container styling */
    .sidebar-fixed {
        position: fixed;
        /* fixed positioning */
        /* Tailwind left-5 is 1.25rem */
        height: 90vh;
        /* custom height calculation */
        z-index: 999;
    }

    /* Main content styling (when sidebar is expanded) */
    .main-content-with-sidebar {
        transition-property: all;
        /* transition all properties */
        transition-duration: 300ms;
        /* Tailwind duration-300 equals 300ms */
        padding-left: calc(16rem + 20px);
        /* for expanded sidebar (16rem + 20px) */
    }

    /* Main content styling when sidebar is collapsed */
    .main-content-with-sidebar-collapsed {
        transition-property: all;
        /* transition all properties */
        transition-duration: 300ms;
        padding-left: calc(2rem + 10px);
        /* for collapsed sidebar (4rem + 20px) */
    }
</style>
