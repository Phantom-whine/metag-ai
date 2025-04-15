<script>
    import { onMount } from "svelte";
    import Profile from "./Profile.svelte";
    import { browser } from "$app/environment";
    import { clickOutside } from "$lib/handler";

    let { username } = $props();
    console.log(username);
    let showMenu = $state(false);
    let ctaText = $state();
    onMount(() => {
        if (browser) {
            ctaText = localStorage.getItem("ctaContent") || "";
        }
    });

    function saveCTA() {
        if (browser) {
            localStorage.setItem("ctaContent", ctaText);
        }
        showMenu = false;
    }

    function createCTAGenerator() {
        const components = {
            openings: [
                [
                    "",
                    "I'd appreciate your insights on this topic. Please share your thoughts in the comments.",
                    "",
                ],
                [
                    "",
                    "I'm curious to hear your perspective. Please feel free to comment below.",
                    "",
                ],
                [
                    "",
                    "Do you share this view? Let’s discuss it in the comments.",
                    "",
                ],
                [
                    "",
                    "This is an interesting point. Let’s explore it further in the comments.",
                    "",
                ],
                [
                    "",
                    "What additional insights do you have? Please join the conversation.",
                    "",
                ],
                [
                    "",
                    "How would you approach this situation? Please share your thoughts below.",
                    "",
                ],
                [
                    "",
                    "Do you agree with this perspective? Let’s discuss in the comments.",
                    "",
                ],
                [
                    "",
                    "This is an interesting point. Let’s discuss it in the comments.",
                    "",
                ],
                [
                    "",
                    "Your insights are valuable. Please share your thoughts in the comments.",
                    "",
                ],
                [
                    "",
                    "What’s your perspective on this topic? Let’s discuss in the comments.",
                    "",
                ],
                [
                    "",
                    "Let’s start a conversation. What are your thoughts on this?",
                    "",
                ],
                [
                    "",
                    "Let’s have a constructive debate. Please share your thoughts.",
                    "",
                ],
                [
                    "",
                    "Were you surprised by this? Please share your reasons in the comments.",
                    "",
                ],
                ["", "Please share your thoughts in the comments below.", ""],
                [
                    "",
                    "What’s your perspective? I’d appreciate your insights.",
                    "",
                ],
                ["", "Please chime in with your thoughts on this topic.", ""],
                [
                    "",
                    "Let’s spark a conversation. What’s your view on this?",
                    "",
                ],
                [
                    "",
                    "Do you have any insights on this? Let’s discuss in the comments.",
                    "",
                ],
                [
                    "",
                    "Please speak up and share your opinion in the comments.",
                    "",
                ],
                [
                    "",
                    "What’s your intuition on this? Let’s discuss in the comments.",
                    "",
                ],
            ],
            likes: [
                [
                    "",
                    "If you agree with this perspective, please show your support with a like.",
                    "",
                ],
                ["", "If you agree, please hit the like button.", ""],
                ["", "Like if this resonates with you.", ""],
                ["", "If this resonates with you, please like the post.", ""],
                ["", "If you support this idea, please hit like.", ""],
                [
                    "",
                    "If you appreciate this content, please show your support with a like.",
                    "",
                ],
                [
                    "",
                    "If this made sense to you, please hit the like button.",
                    "",
                ],
                [
                    "",
                    "If you find this relatable, please give it a thumbs-up.",
                    "",
                ],
                [
                    "",
                    "If you enjoyed this post, please like it and let us know in the comments.",
                    "",
                ],
                [
                    "",
                    "If this makes sense to you, please like the post to show your support.",
                    "",
                ],
                ["", "If this inspired you, please hit the like button.", ""],
                [
                    "",
                    "If you found value in this post, please show your appreciation with a like.",
                    "",
                ],
                ["", "If this resonated with you, please like the post.", ""],
                ["", "If you agree, please let us know with a like.", ""],
                [
                    "",
                    "If this resonated with you, please hit the like button.",
                    "",
                ],
            ],
            shares: [
                [
                    "🚀",
                    "If you found this post valuable, please consider sharing it with your network.",
                    "🚀",
                ],
                [
                    "🚀",
                    "If you found this useful, please share it with your connections.",
                    "🚀",
                ],
                [
                    "💡",
                    "Please share this knowledge with your professional network.",
                    "💡",
                ],
                [
                    "🚀",
                    "If you found this insightful, please share it with others.",
                    "🚀",
                ],
                [
                    "♻️",
                    "If this resonated with you, consider reposting it to help others.",
                    "♻️",
                ],
                [
                    "🔄",
                    "Help spread the word by sharing this post with your network.",
                    "🔄",
                ],
                [
                    "📢",
                    "If this was useful, please consider sharing it with your connections.",
                    "📢",
                ],
                [
                    "💡",
                    "Please share this insight with your professional network.",
                    "💡",
                ],
                [
                    "🤝",
                    "Help others by sharing this post with your connections.",
                    "🤝",
                ],
                [
                    "♻️",
                    "Let's expand this conversation. Please repost this to your connections.",
                    "♻️",
                ],
                [
                    "🗣️",
                    "If you know someone who would benefit from this, please share it with them.",
                    "🗣️",
                ],
                [
                    "📌",
                    "Consider saving this for later reference and sharing it with your network.",
                    "📌",
                ],
                ["🤝", "Let’s help more people by sharing this post.", "🤝"],
                [
                    "🎤",
                    "If this resonated with you, please share it with your network.",
                    "🎤",
                ],
                [
                    "♻️",
                    "Found this insightful? Please repost it to continue the discussion.",
                    "♻️",
                ],
            ],
        };

        const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const [oEmoji, oText] = rand(components.openings);
        const [lEmoji, lText, lEnd] = rand(components.likes);
        const [sEmoji, sText, sEnd] = rand(components.shares);

        ctaText = `${oEmoji} ${oText} \n${sEmoji} ${sText} ${sEnd}`;
    }
</script>

<header class="sticky top-0 z-50 bg-[#0e0e0e]">
    <div class="container mx-auto px-4 h-20 flex items-center justify-between">
        <div class="flex items-center gap-3">
            <!-- <img src="/logo.png" alt="" class="w-9 h-9" />
            <span
                class="text-xl font-semibold tracking-tight flot-b text-white hidden md:inline"
                >Metag</span
            > -->
        </div>
        <div class="flex items-center gap-5">
            <button
                onclick={() => (showMenu = true)}
                class="p-2 rounded-lg hover:bg-zinc-800 text-white"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
                <span class="sr-only">Settings</span>
            </button>

            {#if showMenu}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div
                    class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                    style="z-index: 99999;"
                >
                    <div
                        use:clickOutside={() => (showMenu = !showMenu)}
                        class="bg-[#121212] rounded-xl p-4 w-full max-w-md space-y-4 shadow-xl shadow-black/30"
                    >
                        <div class="space-y-2">
                            <h2 class="text-2xl font-bold text-white flot-b">
                                Edit CTA Content
                            </h2>
                            <p class="text-sm text-zinc-400 flot">
                                Update your call-to-action message below
                            </p>
                        </div>

                        <!-- svelte-ignore element_invalid_self_closing_tag -->
                        <div class="relative">
                            <textarea
                                bind:value={ctaText}
                                class="w-full p-3 rounded-lg bg-zinc-800/90 border border-zinc-700 text-white placeholder-zinc-500
                                       focus:outline-none focus:ring-2 focus:ring-[#ccfc7e]/90 focus:border-[#ccfc7e]/50
                                       transition-all duration-200 resize-none pr-8"
                                rows="4"
                                placeholder="Enter your call to action..."
                            />
                            <!-- svelte-ignore a11y_consider_explicit_label -->
                            <button
                                class="absolute bottom-2 right-1 flex items-center justify-center p-1.5
                                           bg-black/30 backdrop-blur-sm rounded-md border border-white/10
                                           hover:bg-black/40 hover:border-white/20 transition-all duration-200
                                           hover:scale-105 group text-white"
                                onclick={() => createCTAGenerator()}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-3 h-3 text-white/60 group-hover:text-white/80"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.5l-.394-.933a2.25 2.25 0 00-1.423-1.423L13.5 18.5l.933-.394a2.25 2.25 0 001.423-1.423l.394-.933.394.933a2.25 2.25 0 001.423 1.423l.933.394-.933.394a2.25 2.25 0 00-1.423 1.423z"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div class="flex justify-end space-x-2">
                            <button
                                onclick={() => (showMenu = false)}
                                class="px-4 py-1 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700
                                   focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50
                                   transition-colors duration-150 active:scale-[0.98] shadow-md hover:shadow-lg flot"
                            >
                                Cancel
                            </button>

                            <button
                                onclick={saveCTA}
                                class="px-4 py-1 rounded-lg font-medium bg-[#ccfc7e] hover:bg-[#a9e242] text-zinc-900
                                   focus:outline-none focus:ring-2 focus:ring-[#ccfc7e] focus:ring-opacity-50
                                   transition-all duration-150 active:scale-[0.98] shadow-md hover:shadow-lg flot"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            {/if}
            <a href="/dashboard/editor">
                <button
                    class="flot bg-[#ccfc7e] hover:scale-105 active:scale-95 transition text-black font-bold w-full sm:w-auto px-2 py-2 rounded-lg text-sm font-medium flex items-center justify-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="1.5"
                    >
                        <!-- Containing circle for better visual hierarchy -->
                        <circle cx="12" cy="12" r="9" />
                        <!-- Centered plus symbol with adjusted proportions -->
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 8v8M8 12h8"
                        />
                    </svg>
                    Editor
                </button></a
            >
            <div class="block lg:hidden">
                <Profile {username} />
            </div>
        </div>
    </div>
</header>
