<script>
    import { onDestroy } from "svelte";
    import Cookies from "js-cookie";
    import axios from "axios";
    import { tempStore } from "$lib/editor";
    import { goto } from "$app/navigation";

    function plainPaste(node) {
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

    let { content, id, type, timeFrame, title } = $props();
    content = content.replace(/\[/g, '');     // Remove all [
    content = content.replace(/\]/g, '');     // Remove all ]
    let copied = $state(false);
    let expanded = $state(false); // New state for expand/collapse
    function pickRandom() {
        return Math.random() < 0.5 ? "Paul Jessey" : "Paul Jerry";
    }
    let rand_text = $state(pickRandom());

    let content_edited;

    const API_URL = import.meta.env.VITE_DJANGO_API_URL;
    const API_ENDPOINT = (id) => `${API_URL}/api/posts/edit/${id}/`;
    const getAuthHeader = () => ({
        Authorization: `Bearer ${Cookies.get("access")}`,
    });

    // API function
    async function saveEdits(id, content) {
        try {
            await axios.post(
                API_ENDPOINT(id),
                { content },
                {
                    headers: getAuthHeader(),
                },
            );
            console.log("Edit saved successfully");
        } catch (error) {
            console.error("Failed to save edit:", error.message);
            // Consider re-throwing or handling error as needed
        }
    }

    // Component lifecycle
    onDestroy(async () => {
        if (id) {
            await saveEdits(
                id,
                content_edited.innerHTML.replace(/<!---->/g, ""),
            );
        }
    });

    async function copyContent() {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content_edited.innerHTML, "text/html");
        const walker = document.createTreeWalker(doc.body, NodeFilter.SHOW_ALL);
        let text = "";
        let lastWasBr = false;
        while (walker.nextNode()) {
            const node = walker.currentNode;

            if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.tagName === "P") {
                    // Add newline before paragraph content
                    if (text.length > 0) text += "\n";
                    lastWasBr = false;
                } else if (node.tagName === "BR" || node.tagName === "DIV") {
                    // Add double newline for line breaks
                    text += "\n";
                    lastWasBr = true;
                }
            } else if (node.nodeType === Node.TEXT_NODE) {
                // Add text content with normalized whitespace
                const content = node.textContent.trim();
                if (content) {
                    text += (lastWasBr ? "" : "") + content;
                    lastWasBr = false;
                }
            }
        }

        try {
            await navigator.clipboard.writeText(text);
            copied = true;
            setTimeout(() => (copied = false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    }

    const sendEditor = () => {
        tempStore.setTemp(title, content);
        goto(`/dashboard/editor/?post_id=${id}`);
    };

    let displayedText = $state(""); // The text shown so far
    let isTyping = $state(false); // Whether typing is in progress

    // React to changes in the text prop using $effect rune
    $effect(() => {
        if (type) {
            const currentText = content; // Capture current text value
            displayedText = ""; // Reset displayed text
            isTyping = true; // Show the cursor

            let index = 0;
            const intervalId = setInterval(() => {
                if (index < currentText.length) {
                    displayedText += currentText[index]; // Add next character
                    index++;
                } else {
                    clearInterval(intervalId); // Stop when done
                    isTyping = false; // Hide the cursor
                }
            }, 10); // 100ms delay per character

            // Cleanup function to clear the interval
            return () => {
                clearInterval(intervalId);
            };
        }
    });
</script>

<div class="w-full max-w-xl bg-black rounded-2xl">
    <!-- Header -->
    <div class="p-4">
        <div class="flex justify-between items-start">
            <div class="flex gap-2">
                <!-- Avatar -->
                <div
                    class="h-12 w-12 rounded-full overflow-hidden border-2 border-gray-700"
                >
                    <img
                        src="/in.png"
                        alt="Profile"
                        class="h-full w-full object-cover"
                    />
                </div>
                <!-- Profile Info -->
                <div>
                    <h3 class="font-semibold text-gray-200">Metag AI</h3>
                    <p class="text-sm text-gray-400">Made with Love ❤️</p>
                    <div class="flex items-center gap-1 text-sm text-gray-500">
                        <span
                            >{#if timeFrame}
                                {timeFrame}
                            {:else}
                                Now
                            {/if}</span
                        >
                        <span>•</span>
                        <span>🌐</span>
                    </div>
                </div>
            </div>
            <!-- Copy Button -->
            <div class="flex gap-2">
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <button
                    onclick={sendEditor}
                    class="text-black active:scale-95 transition transition-colors text-base flex items-center justify-center gap-2 flot bg-[#ccfc7e] rounded-md"
                    style="padding: 3px;"
                >
                <span class="text-sm">Editor</span>
                   <div class="bg-black p-[1px] rounded-md text-white" style="padding: 3px;">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path
                        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                    />
                </svg>
                   </div>
                </button>
                <button
                onclick={copyContent}
                class="group relative p-1 rounded-md hover:bg-gray-700/30 transition-all
                       focus:outline-none focus:ring-2 focus:ring-gray-400/50
                       active:scale-95 disabled:opacity-50"
                aria-label={copied ? "Copied!" : "Copy to clipboard"}
            >
                <!-- Tooltip -->
                <div class="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs 
                            bg-zinc-600 text-gray-100 rounded-md opacity-0 
                            group-hover:opacity-100 group-focus:opacity-100 transition-opacity
                            pointer-events-none after:content-[''] after:absolute after:bottom-[-5px] after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0 after:border-l-[5px] after:border-l-transparent after:border-r-[5px] after:border-r-transparent after:border-t-[5px] after:border-t-gray-800">
                    {copied ? "Copied!" : "Copy"}
                </div>
            
                <!-- Icons -->
                {#if copied}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-green-400"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path
                            d="M10 15.17l-4.17-4.18-1.42 1.41 5.59 5.59 12-12-1.41-1.41z"
                        />
                    </svg>
                {:else}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gray-300 group-hover:text-gray-100 transition-colors"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path
                            d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z"
                        />
                    </svg>
                {/if}
            </button>
            </div>
        </div>
    </div>

    <!-- Content -->
    <div class="p-4 pt-0 space-y-4 text-gray-200">
        <div
            class="{expanded ? '' : 'truncate-lines'} transition-all dib focus:border transition outline-none rounded-md border-[#ccfc7e] transition focus:border-2"
            contenteditable
            bind:this={content_edited}
            use:plainPaste
        >
            {#if type}
                {#if content}
                    {@html displayedText}
                {/if}
                {#if isTyping}
                    <span class="cursor">|</span>
                {/if}
            {:else}
                {@html content}
            {/if}
        </div>
        <button
            onclick={() => (expanded = !expanded)}
            class="text-blue-400 hover:text-blue-300 text-sm font-medium"
        >
            {expanded ? "See Less" : "See More"}
        </button>

        <!-- Engagement Section -->
        <!-- Engagement Section -->
        <div class="pt-4 border-t border-gray-800">
            <div
                class="flex gap-4 flex-row items-center justify-between text-sm text-gray-400"
            >
                <!-- Left Section -->
                <div class="flex flex-wrap items-center gap-2">
                    <!-- Buttons Container -->
                    <div
                        class="flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1 shadow-sm space-x-1"
                    >
                        <!-- Like Button -->
                        <!-- svelte-ignore a11y_consider_explicit_label -->
                        <button
                            class="p-1 md:p-1.5 bg-blue-500/90 hover:bg-blue-600 rounded-full shadow-md transition-all duration-200 ease-out hover:scale-105 transform active:scale-95"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4 md:h-5 md:w-5 text-white"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                                />
                            </svg>
                        </button>

                        <!-- Heart Button -->
                        <button
                            class="p-1 md:p-1.5 bg-red-500/90 hover:bg-red-600 rounded-full shadow-md transition-all duration-200 ease-out hover:scale-105 transform active:scale-95"
                        >
                            <span class="text-white text-xs md:text-sm">❤️</span
                            >
                        </button>

                        <!-- Target Button -->
                        <button
                            class="p-1 md:p-1.5 bg-yellow-500/90 hover:bg-yellow-600 rounded-full shadow-md transition-all duration-200 ease-out hover:scale-105 transform active:scale-95"
                        >
                            <span class="text-white text-xs md:text-sm">🎯</span
                            >
                        </button>
                    </div>

                    <!-- Text Section -->
                    <span class="md:text-xs text-sm hidden md:inline"
                        >{rand_text} and 326 others</span
                    >
                </div>

                <!-- Right Section -->
                <div
                    class="flex items-center gap-2 md:gap-4 text-xs md:text-sm"
                >
                    <!-- <span>655 comments</span>
                    <span>20k likes</span> -->
                    <div
                        class="flex items-center gap-2 p-1.5 bg-zinc-900 rounded-lg shadow-sm transition-colors"
                    >
                        <!-- Progress Line -->
                        <div class="flex-1 space-y-0.5">
                            <div
                                class="relative h-1.5 bg-gray-800 rounded-full overflow-hidden"
                            >
                                <div
                                    class="absolute h-full bg-[#beff54] rounded-full"
                                    style="width: 100%"
                                ></div>
                            </div>
                            <p class="text-[0.6rem] leading-3 text-gray-400">
                                Verification
                            </p>
                        </div>

                        <!-- Status Badge -->
                        <div
                            class="flex items-center gap-1 px-1.5 py-0.5 bg-[#beff54]/20 rounded-md"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-2.5 w-2.5 text-emerald-400"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1 1 0 111.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"
                                />
                            </svg>
                            <span
                                class="text-[0.6rem] font-semibold text-emerald-200"
                                >{#if isTyping}
                                    Loading{:else}Human
                                {/if}</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>

    .truncate-lines {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .cursor {
        animation: blink 1s step-end infinite;
    }

    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
</style>
