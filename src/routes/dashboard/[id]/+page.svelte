<script>
    import LinkedinCard from "$lib/components/dashboard/LinkedinCard.svelte";
    import Navbar from "$lib/components/dashboard/Navbar.svelte";
    import { onMount } from "svelte";
    import Cookies from "js-cookie";
    import axios from "axios";
    import Toast from "$lib/components/shared/Toast.svelte";
    import LkSk from "$lib/components/dashboard/LkSk.svelte";

    let { data } = $props();
    let { user } = data;
    let { id } = data;
    let new_title = $state();
    const API_URL = 'https://metag-prod-api-ql90k.kinsta.app';

    let msg = $state();
    let type = $state();

    let post = $state();

    function triggerToast(type_arg, msg_arg) {
        msg = msg_arg;
        type = type_arg;
    }

    onMount(async () => {
        try {
            const response = await axios.get(
                `${API_URL}/api/posts/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("access")}`,
                    },
                },
            );
            post = response.data;
        } catch (error) {
            triggerToast("error", "Could not Load post");
        }
    });
    function removeTags(inputText) {
        // Remove all <br> and <p> tags (including closing tags)
        const cleanedText = inputText.replace(/<\/?\w+\s*\/?>/gi, "");
        const newtxt = cleanedText.replace(/<!---->/g, "");
        return newtxt;
    }

    let title = $state();
    $effect(() => {
        if (post) {
            title = removeTags(post.title);
        }
    });
</script>

<Navbar username={user.fullname} />
{#if msg}
    <Toast bind:message={msg} {type} />
{/if}
<svelte:head>
    {#if post}
        <title>Metag - {title}</title>
    {:else}
        <title>Metag - Loading</title>
    {/if}
</svelte:head>
<div class="w-full max-w-7xl mx-auto p-4 min-h-screen">
    <div class="max-w-7xl mx-auto py-4">
        <div class="flex items-center justify-end gap-4 flex-row-reverse">
            <!-- Header Text -->
            <h1 class="text-xl font-semibold text-white flot md:flot-b">
                {#if post}
                    {title}
                {:else}
                    <div
                        class="relative h-6 w-48 overflow-hidden rounded-lg bg-zinc-600"
                    >
                        <div
                            class="absolute inset-0 -translate-x-full shimmer-overlay bg-zinc-700"
                        ></div>
                    </div>
                {/if}
            </h1>
        </div>
    </div>
    <div class="bg-zinc-900 text-white rounded-xl p-1 md:p-2 min-h-screen">
        <div
            class="h-full flex items-center justify-center text-gray-400 p-1 md:p-4"
        >
            {#if post}
                <LinkedinCard
                    content={post.content}
                    id={post.id}
                    type={false}
                    timeFrame={post.time_ago}
                    title={post.title}
                />
            {:else}
                <LkSk />
            {/if}
        </div>
    </div>
</div>

<style>
    .shimmer-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.05),
            transparent
        );
        animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(100%);
        }
    }
</style>
