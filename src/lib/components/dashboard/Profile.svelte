<script>
    import { clearTokens } from "$lib/auth";
    import { goto } from "$app/navigation";
    import Cookies from "js-cookie";
    import { onMount } from "svelte";
    import { clickOutside } from "$lib/handler";

    const logout = () => {
        clearTokens();
        goto("/");
    };

    let profile_url = $state();
    onMount(() => {
        profile_url = Cookies.get("profile");
    });
    $effect(() => {
        profile_url;
    });

    let isOpen = $state(false);
    let { username } = $props();

    const menuItems = [
        {
            name: "Profile",
            icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
        },
        {
            name: "Billing",
            icon: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z",
        },
        {
            name: "Support",
            icon: "M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 10-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 119.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 11-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 107.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z",
        },
        {
            name: "Logout",
            icon: "M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9",
        },
    ];
</script>

<div class="relative flot">
    <div class="relative inline-block">
        <button
            onclick={() => (isOpen = !isOpen)}
            class="active:scale-95 h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center hover:bg-orange-600 transition-all cursor-pointer focus:outline-none"
        >
            <img src={profile_url} alt="profile" class="w-full rounded-full" />
        </button>
        <span
            class="absolute left-1/2 -translate-x-1/2 translate-y-2 bottom-0 bg-black text-white text-xs px-2 flot rounded-full whitespace-nowrap"
        >
            MENU
        </span>
    </div>

    {#if isOpen}
        <div
            use:clickOutside={() => (isOpen = false)}
            class="absolute right-0 mt-2 w-48 bg-zinc-900 rounded-lg shadow-lg z-50 border border-zinc-800"
        >
            <div class="p-2 space-y-2">
                <a href="/dashboard">
                    <button
                        class="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-100 hover:bg-zinc-700 rounded-md transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            ><rect width="7" height="9" x="3" y="3" rx="1"
                            ></rect><rect
                                width="7"
                                height="5"
                                x="14"
                                y="3"
                                rx="1"
                            ></rect><rect
                                width="7"
                                height="9"
                                x="14"
                                y="12"
                                rx="1"
                            ></rect><rect
                                width="7"
                                height="5"
                                x="3"
                                y="16"
                                rx="1"
                            ></rect></svg
                        >
                        <span>Dashboard</span>
                    </button>
                </a>
                <a href="/dashboard/generate">
                    <button
                        class="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-100 hover:bg-zinc-700 rounded-md transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            ><path
                                d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"
                            ></path></svg
                        >
                        <span>Generate</span>
                    </button>
                </a>
                <a href="/dashboard/guide">
                    <button
                        class="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-100 hover:bg-zinc-700 rounded-md transition-colors"
                    >
                        `<svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            ><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
                            ></path><path
                                d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
                            ></path></svg
                        >
                        <span>Guide</span>
                    </button>
                </a>
                <a href="/dashboard/voice">
                    <button
                        class="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-100 hover:bg-zinc-700 rounded-md transition-colors"
                    >
                        `<svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            ><path
                                d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"
                            ></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"
                            ></path><line x1="12" x2="12" y1="19" y2="22"
                            ></line></svg
                        >
                        <span>Voice</span>
                    </button>
                </a>
                <a href="/dashboard/profile">
                    <button
                        class="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-100 hover:bg-zinc-700 rounded-md transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-5 h-5"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                            />
                        </svg>
                        <span>Profile</span>
                    </button>
                </a>
            </div>
        </div>
    {/if}
</div>
