<script>
    import Navbar from "$lib/components/dashboard/Navbar.svelte";
    import AbortCard from "$lib/components/dashboard/AbortCard.svelte";
    import Toast from "$lib/components/shared/Toast.svelte";
    import { tempStore } from "$lib/editor.js";
    import Cookies from "js-cookie";
    import { onDestroy, onMount } from "svelte";
    import axios from "axios";
    import { page } from "$app/stores";
    import { derived } from "svelte/store";
    import { browser } from "$app/environment";
    import {clickOutside} from "$lib/handler";
    import LkSk from "$lib/components/dashboard/LkSk.svelte";

    let { data } = $props();
    let msg = $state();
    let type = $state();
    let profile = $state();
    let original = $state($tempStore.tempText);
    let loading = $state(false);
    let ai_prompt = $state();

    const API_URL = 'https://metag-prod-api-ql90k.kinsta.app';
    
    const postId = $page.url.searchParams.get("post_id");

    function removeTags(inputText) {
        // Remove all <br> and <p> tags (including closing tags)
        const cleanedText = inputText.replace(/<\/?\w+\s*\/?>/gi, "");
        let newtxt = cleanedText.replace(/<!---->/g, "");
        newtxt = newtxt.replace(/&nbsp;/g, "");
        newtxt = newtxt.replace(/<!--45h-->/g, "");
        return newtxt;
    }

    let opened = !!$tempStore.tempTitle;
    $effect(() => {
        profile;
        if (!opened) {
            title = removeTags(value).split(" ").slice(0, 5).join(" ");
        }
    });

    let characterCount = $state(0);
    let isOpen = $state(false);
    let isActionsOpen = $state(false);
    let isAIPromptOpen = $state(false);
    let title = $state($tempStore.tempTitle);
    let time_ago = $state("");

    let editorArea;
    let value = $state($tempStore.tempText);
    let count = $state();
    let saved = false;

    onMount(async () => {
        count = value.length;
        profile = Cookies.get("profile");
        title = $tempStore.tempTitle;
        if (!!postId == false) {
            title = "";
            value = "";
            original = "";
            editorArea.innerHTML = "";
        }
        if (postId && !value) {
            try {
                const res = await axios.get(`${API_URL}/api/posts/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("access")}`,
                    },
                });
                value = res.data.content;
                title = res.data.title;
                time_ago = res.data.time_ago;
                editorArea.innerHTML = res.data.content;
                triggerToast("success", "Content Loaded");
            } catch (error) {
                triggerToast("error", 'An error occured');
            }
        }
    });

    function observeEditor(node) {
        editorArea = node;
        const observer = new MutationObserver(() => {
            value = node.innerHTML;
            count = node.textContent.length;
        });

        observer.observe(node, {
            childList: true,
            subtree: true,
            characterData: true,
        });

        return {
            destroy() {
                observer.disconnect();
            },
        };
    }

    function triggerToast(type_arg, msg_arg) {
        msg = msg_arg;
        type = type_arg;
    }

    const API_ENDPOINT = (id) => `${API_URL}/api/posts/edit/${id}/`;

    onDestroy(async () => {
        tempStore.delTemp();
        if (!postId) {
            try {
                const API_URL = import.meta.env.VITE_DJANGO_API_URL;
                const response = await axios.post(
                    `${API_URL}/api/posts/save-editor/`,
                    {
                        content: value,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("access")}`,
                        },
                    },
                );
            } catch (error) {
                triggerToast("error", error);
            }
        } else {
            try {
                const API_URL = import.meta.env.VITE_DJANGO_API_URL;
                const response = await axios.post(
                    `${API_URL}/api/posts/edit/${postId}/`,
                    {
                        content: editorArea.innerHTML.replace(/<!---->/g, ""),
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("access")}`,
                        },
                    },
                );
            } catch (error) {
                triggerToast("error", error);
            }
        }
    });

    async function editWithAI(task) {
        if (task.length < 3) {
            triggerToast("error", "Not enough context for edit");
        }
        if (value.length < 20) {
            triggerToast("error", "Not enough context");
        } else {
            if (!saved) {
                original = editorArea.innerHTML;
                saved = true;
            }
            try {
                loading = true;
                const API_URL = import.meta.env.VITE_DJANGO_API_URL;
                const response = await axios.post(
                    `${API_URL}/api/posts/edit-ai/`,
                    {
                        content: value,
                        prompt: task,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("access")}`,
                        },
                    },
                );

                const data = response.data;
                value = data.result;
                editorArea.innerHTML = data.result;
                loading = false;
                ai_prompt = "";
            } catch (error) {
                loading = false;
                triggerToast("error", error);
            }
        }
    }
    export function plainPaste(node) {
    function handlePaste(event) {
        // Prevent the default paste behavior, which includes styles
        event.preventDefault();

        // Get the plain text from the clipboard
        const text = event.clipboardData.getData('text/plain');

        // Access the current selection in the contenteditable element
        const selection = window.getSelection();

        if (selection.rangeCount) {
            // Remove any selected content
            selection.deleteFromDocument();

            // Get the current range where the cursor is
            const range = selection.getRangeAt(0);

            // Create a text node with the plain text
            const textNode = document.createTextNode(text);

            // Insert the text node at the cursor position
            range.insertNode(textNode);

            // Move the cursor to after the inserted text
            range.setStartAfter(textNode);
            range.setEndAfter(textNode);

            // Update the selection with the new range
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    // Attach the paste event listener to the node
    node.addEventListener('paste', handlePaste);

    // Return a cleanup function to remove the listener when the element is destroyed
    return {
        destroy() {
            node.removeEventListener('paste', handlePaste);
        }
    };
}
</script>

{#if msg}
    <Toast bind:message={msg} {type} />
{/if}
<svelte:head>
    <title>Metag - Editor</title>
</svelte:head>
<Navbar username={data.user.fullname} />
<div class="max-w-[95%] md:max-w-7xl mx-auto py-4 mt-6">
    <div class="flex items-center justify-end gap-4 flex-row-reverse">
        <!-- Header Text -->
        <h1 class="text-xl font-semibold text-white flot-b">
            AI Linkedin Editor
        </h1>
    </div>
</div>
<div
    class="grid lg:grid-cols-2 gap-4 max-w-[95%] md:max-w-7xl mx-auto mb-[50px]"
>
    <div class="bg-black p-2 w-full max-w-2xl mx-auto rounded-xl shadow-sm">
        <div
            class="flex items-center justify-between rounded-xl bg-[#262629] pr-2"
        >
            <div class="flex items-center gap-3 m-2">
                <img src="/in.png" alt="Profile" class="rounded-full w-9 h-9" />
                <span class="font-medium text-white flot">
                    {title}
                </span>
            </div>
            <div class="flex items-center gap-2">
                <div class="relative flex gap-2">
                    <div
                        class="flex items-center gap-2 text-white px-2 py-1 rounded-md flot bg-black shadow-sm inline"
                    >
                        <div
                            class="h-3 w-3 bg-blue-500 rounded-full animate-pulse"
                        ></div>
                        <span class="text-sm text-gray-200">Autosave</span>
                    </div>
                    <button
                        onclick={() => (isOpen = !isOpen)}
                        class="h-8 w-8 inline-flex items-center justify-center rounded-md bg-gray-100"
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
                            class="h-4 w-4"
                        >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                        </svg>
                        <span class="sr-only">More options</span>
                    </button>

                    {#if isOpen}
                        <div
                            use:clickOutside={()=>isOpen = false}
                            class="absolute right-0 mt-10 w-56 bg-white rounded-md shadow-lg"
                        >
                            <div class="m-1">
                                <button
                                    onclick={() => {
                                        editorArea.innerHTML = original;
                                        value = original;
                                    }}
                                    class="flot block w-full px-2 py-1 text-left hover:bg-gray-300 rounded-md"
                                    >Revert to original</button
                                >
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>

        <div class="p-4">
            <div
                use:observeEditor
                use:plainPaste
                contenteditable
                class="w-full min-h-[400px] resize-none border-0 focus:ring-0 focus:outline-none text-white"
            >
                {@html $tempStore.tempText}
            </div>
        </div>

        <div class="flex items-center justify-between p-1">
            <div
                class="flot flex items-center gap-2 px-1 py-1 bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-sm border border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-default group"
            >
                <span class="text-gray-300 text-sm font-medium hidden md:inline"
                    >Characters</span
                >
                <div class="w-px h-5 bg-gray-600 hidden md:block"></div>
                <span
                    class="text-white font-semibold font-mono text-sm px-2 py-1 rounded-md {count >
                    2000
                        ? 'bg-red-600'
                        : 'bg-green-600'}"
                >
                    {count}
                </span>
            </div>

            <div class="relative">
                {#if !isAIPromptOpen}
                    <button
                        onclick={() => (isActionsOpen = !isActionsOpen)}
                        class="h-9 w-9 inline-flex items-center justify-center rounded-md bg-[#ccfc7e] active:scale-95 transition text-white disabled:opacity-75 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {#if loading}
                            <svg
                                class="animate-spin h-4 w-4"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    class="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="black"
                                    stroke-width="4"
                                    fill="none"
                                />
                                <path
                                    class="opacity-75"
                                    fill="black"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                        {:else}
                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                class="h-4 w-4 fill-black"
                            >
                                <path
                                    d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V6H8.5C8.22386 6 8 5.77614 8 5.5V2H3.5ZM9 2.70711L11.2929 5H9V2.70711ZM2 2.5C2 1.67157 2.67157 1 3.5 1H8.5C8.63261 1 8.75979 1.05268 8.85355 1.14645L12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5Z"
                                />
                            </svg>
                        {/if}
                        <span class="sr-only">Actions</span>
                    </button>
                {/if}
                {#if isActionsOpen}
                    <div
                        use:clickOutside={()=>isActionsOpen = !isActionsOpen}
                        class="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-md shadow-lg border"
                    >
                        <div class="m-1 flot">
                            <button
                                disabled={loading}
                                onclick={() =>
                                    editWithAI(
                                        "Regenerate and make it Humanized",
                                    )}
                                class="flex items-center w-full px-2 py-1 text-left hover:bg-gray-300 rounded-md"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-4 h-4 mr-2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                    />
                                </svg>
                                Regenerate
                            </button>

                            <button
                                class="flex items-center w-full px-2 py-1 text-left hover:bg-gray-300 rounded-md"
                                onclick={() => editWithAI("Improve the Hook")}
                                disabled={loading}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-4 h-4 mr-2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                                    />
                                </svg>
                                Change The Hook
                            </button>

                            <button
                                class="flex items-center w-full px-2 py-1 text-left hover:bg-gray-300 rounded-md"
                                onclick={() => editWithAI("fix grammer")}
                                disabled={loading}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-4 h-4 mr-2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                                    />
                                </svg>
                                Fix Grammer
                            </button>

                            <button
                                onclick={() => {
                                    isAIPromptOpen = true;
                                    isActionsOpen = false;
                                }}
                                disabled={loading}
                                class="flex items-center w-full px-2 py-1 text-left hover:bg-gray-300 rounded-md"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-4 h-4 mr-2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                                    />
                                </svg>
                                ASK AI
                            </button>
                        </div>
                    </div>
                {/if}
                {#if isAIPromptOpen}
                    <div class="flex items-center space-x-2">
                        <div class="flex bg-white p-1 rounded-md">
                            <input
                                bind:value={ai_prompt}
                                type="text"
                                placeholder="Enter your AI prompt"
                                class="flex-grow px-3 rounded-md focus:outline-none flot"
                            />
                            <!-- svelte-ignore a11y_consider_explicit_label -->
                            <button
                                onclick={() => editWithAI({ ai_prompt })}
                                class="flex items-center gap-2 px-2 py-2 bg-[#ccfc7e] text-black rounded-md hover:bg-[#b8e870] focus:outline-none focus:ring-2 focus:ring-[#ccfc7e] disabled:opacity-75 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                {#if loading}
                                    <svg
                                        class="animate-spin h-5 w-5"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            class="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            stroke-width="4"
                                            fill="none"
                                        />
                                        <path
                                            class="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                {:else}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        class="w-5 h-5"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M22 2L11 13M22 2L15 22l-4-9-9-4z"
                                        />
                                    </svg>
                                {/if}
                            </button>
                        </div>

                        <!-- svelte-ignore a11y_consider_explicit_label -->
                        <button
                            onclick={() => (isAIPromptOpen = false)}
                            class="flex items-center gap-2 px-2 flot py-2 bg-red-500 text-white rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                class="w-5 h-5"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="4"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>
                    </div>
                {/if}
            </div>
        </div>
    </div>
    <div>
        <AbortCard content={value} {time_ago} />
    </div>
</div>
