<script>
    import Cookies from "js-cookie";
    import axios from "axios";
    import Navbar from "$lib/components/dashboard/Navbar.svelte";
    import ModalTopic from "$lib/components/dashboard/ModalTopic.svelte";
    import LinkedinCard from "$lib/components/dashboard/LinkedinCard.svelte";
    import Toast from "$lib/components/shared/Toast.svelte";
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import { clickOutside } from "$lib/handler";

    let loading = $state(false);
    let loading_gen = $state(false);
    let { data } = $props();

    let activeTab = $state("text");
    let openModal = $state(false);

    let topic = $state();
    let youtube = $state();
    let url = $state();

    let tone = $state("Best suited");
    let cta = $state();
    onMount(() => {
        if (browser) {
            cta = localStorage.getItem("ctaContent") || "";
        }
    });
    let result = $state();
    let isOpen = $state(false);

    let msg = $state();
    let type = $state();

    let use_voice = false;

    function triggerToast(type_arg, msg_arg) {
        msg = msg_arg;
        type = type_arg;
    }

    const options = $state([
        { value: "best suited", label: "👌 Best Suited" },
        { value: "professional", label: "🧐 Professional" },
        { value: "casual", label: "😀 Casual" },
        { value: "humorous", label: "🤣 Humorous" },
        { value: "inspirational", label: "🤠 Inspirational" },
    ]);

    let selectedLabel = $derived(
        options.find((opt) => opt.value === tone)?.label || "👌 Best Suited",
    );

    function handleSelect(value) {
        tone = value;
        isOpen = false
        if(value == 'Using your Voice'){
            selectedLabel = `🤖 ${value}`;
            use_voice = true;
        }else{
            use_voice = false;
        }
    }

    function isValidYouTubeUrl(urlString) {
        try {
            const url = new URL(urlString);
            if (url.protocol !== "https:") return false;

            const host = url.hostname.replace(/^www\./, "");
            const pathSegments = url.pathname.split("/").filter(Boolean);

            // Common video ID patterns
            const videoIdRegex = /^[A-Za-z0-9_-]{11}$/;

            // Check for different YouTube URL formats
            if (host === "youtube.com" || host === "youtu.be") {
                // Shortened URL format (youtu.be)
                if (host === "youtu.be" && pathSegments.length >= 1) {
                    return videoIdRegex.test(pathSegments[0]);
                }

                // Standard video URL
                if (pathSegments[0] === "watch" && url.searchParams.get("v")) {
                    return videoIdRegex.test(url.searchParams.get("v"));
                }

                // Embedded/iframe URL
                if (pathSegments[0] === "embed" && pathSegments.length >= 2) {
                    return videoIdRegex.test(pathSegments[1]);
                }

                // Live stream URL
                if (pathSegments[0] === "live" && pathSegments.length >= 2) {
                    return videoIdRegex.test(pathSegments[1]);
                }
            }

            return false;
        } catch (error) {
            return false;
        }
    }

    function isValidHttpsUrl(urlString) {
        try {
            const url = new URL(urlString);

            // Check if protocol is HTTPS and hostname is present
            return url.protocol === "https:" && url.hostname !== "";
        } catch (error) {
            return false;
        }
    }

    const generatePost = async () => {
        const API_URL = import.meta.env.VITE_DJANGO_API_URL;
        let endpoint, payload, validationError;

        try {
            loading = true;

            // Configuration based on active tab
            switch (activeTab) {
                case "text":
                    if (!topic) {
                        triggerToast("error", "You must enter a Topic!");
                        return;
                    }
                    endpoint = `${API_URL}/api/posts/create-text/`;
                    payload = { topic, tone, cta, use_voice };
                    break;

                case "youtube":
                    if (!youtube || !isValidYouTubeUrl(youtube)) {
                        triggerToast(
                            "error",
                            "You must enter a valid YouTube Link!",
                        );
                        return;
                    }
                    endpoint = `${API_URL}/api/posts/create-youtube/`;
                    payload = { y_url: youtube, tone, cta, use_voice };
                    break;

                case "url":
                    if (!url || !isValidHttpsUrl(url)) {
                        triggerToast("error", "You must enter a valid Link!");
                        return;
                    }
                    endpoint = `${API_URL}/api/posts/create-url/`;
                    payload = { w_url: url, tone, cta, use_voice };
                    break;

                default:
                    triggerToast("error", "Invalid content type selected");
                    return;
            }

            // API Request
            const response = await axios.post(endpoint, payload, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("access")}`,
                },
            });

            // Handle response
            result = response.data;
            console.log("Generated content:", result.content);
            triggerToast("success", "Post Generated Successfully");
        } catch (error) {
            // Error handling
            const errorMessage = "Failed to generate post";
            triggerToast("error", errorMessage);
        } finally {
            loading = false;
        }
    };

    const regenerate = async () => {
        loading_gen = true;
        try {
            const API_URL = import.meta.env.VITE_DJANGO_API_URL;
            const response = await axios.post(
                `${API_URL}/api/posts/regenerate/${result.id}/`,
                {}, // Empty request body
                {
                    // Config object as third parameter
                    headers: {
                        Authorization: `Bearer ${Cookies.get("access")}`,
                    },
                },
            );
            result = response.data;
            triggerToast("success", "Post Regenrated");
            loading_gen = false;
        } catch (error) {
            triggerToast("error", "Could not regenerate");
            loading_gen = false;
        }
    };

    let isRecording = $state(false);
    let recognition = null;
    let interimTranscript = $state("");

    $effect(() => {
        if (typeof window === "undefined") return;
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
            let processedFinal = "";
            let processedInterim = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i];
                const transcript = result[0].transcript.trim();

                if (result.isFinal) {
                    processedFinal += transcript + " ";
                } else {
                    processedInterim = transcript;
                }
            }

            if (processedFinal) {
                // Add final results to the topic state
                topic += (topic ? " " : "") + processedFinal.trim();
                interimTranscript = "";
            }

            if (processedInterim) {
                interimTranscript = processedInterim;
            }
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            isRecording = false;
            interimTranscript = "";
        };

        recognition.onend = () => {
            if (!isRecording) {
                interimTranscript = "";
                return;
            }

            setTimeout(() => {
                try {
                    recognition.start();
                } catch (e) {
                    console.error("Restart failed:", e);
                    isRecording = false;
                    interimTranscript = "";
                }
            }, 100);
        };

        return () => {
            if (recognition) {
                recognition.stop();
                recognition = null;
            }
        };
    });

    function toggleVoiceInput() {
        if (!recognition) {
            alert("Speech recognition not supported in your browser");
            return;
        }

        isRecording = !isRecording;

        if (isRecording) {
            // Reset when starting new session
            topic = "";
            interimTranscript = "";
            recognition.start();
        } else {
            recognition.stop();
        }
    }

    function clearTopic() {
        topic = "";
        interimTranscript = "";
    }
</script>

<svelte:head>
    <title>Create Viral Post</title>
</svelte:head>
{#if msg}
    <Toast bind:message={msg} {type} />
{/if}
<Navbar username={data.user.fullname} />
<ModalTopic
    bind:openModal
    onUse={(val) => {
        topic = val;
        openModal = false;
    }}
/>
<div class="w-full max-w-7xl mx-auto p-4 min-h-screen">
    <div class="max-w-7xl mx-auto py-4">
        <div class="flex items-center justify-end gap-4 flex-row-reverse">
            <!-- Header Text -->
            <h1 class="text-xl font-semibold text-white flot-b">
                Create Viral Post 🌐
            </h1>
        </div>
    </div>
    <div class="bg-zinc-900 text-white rounded-xl p-2">
        <div class="p-2 sm:p-2">
            <div class="grid lg:grid-cols-2 gap-6">
                <!-- Left Section - Input -->
                <div class="space-y-4">
                    <div class="w-full">
                        <div class="w-full bg-zinc-800 rounded-lg p-1 flex">
                            <button
                                onclick={() => {
                                    activeTab = "text";
                                }}
                                class:bg-zinc-700={activeTab === "text"}
                                class="flex-1 py-2 px-4 rounded-md transition-colors"
                            >
                                <div class="flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-4 w-4 mr-2"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                                        />
                                    </svg>
                                    <span class="hidden md:inline">Topic</span>
                                </div>
                            </button>
                            <button
                                onclick={() => (activeTab = "youtube")}
                                class:bg-zinc-700={activeTab === "youtube"}
                                class="flex-1 py-1 px-4 rounded-md transition-colors"
                            >
                                <div class="flex items-center justify-center">
                                    <svg
                                        class="w-4 h-4 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                                        />
                                    </svg>
                                    <span class="hidden md:inline">Youtube</span
                                    >
                                </div>
                            </button>
                            <button
                                onclick={() => (activeTab = "url")}
                                class:bg-zinc-700={activeTab === "url"}
                                class="flex-1 py-2 px-4 rounded-md transition-colors"
                            >
                                <div class="flex items-center justify-center">
                                    <svg
                                        class="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                        />
                                    </svg>
                                    <span class="hidden md:inline">URL</span>
                                </div>
                            </button>
                        </div>
                    </div>
                    {#if activeTab === "text"}
                        <!-- Topic Input -->
                        <div class="space-y-2">
                            <!-- svelte-ignore a11y_label_has_associated_control -->
                            <label class="text-sm text-gray-300 mb-2 block"
                                >Topic</label
                            >
                            <div class="relative">
                                <textarea
                                    bind:value={topic}
                                    id="topic"
                                    placeholder="What would you like to write about?"
                                    class="w-full min-h-[120px] bg-zinc-800 border-zinc-700 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-[#d4ff52] focus border-[#d4ff52] pr-10"
                                ></textarea>

                                <button
                                    onclick={toggleVoiceInput}
                                    class="absolute top-[-37px] right-0 p-1.5 rounded-md transition-colors {isRecording
                                        ? 'bg-red-500/800 hover bg-red-500'
                                        : 'bg-zinc-700/50 hover bg-zinc-600'}"
                                    title={isRecording
                                        ? "Stop recording"
                                        : "Start voice input"}
                                >
                                    {#if isRecording}
                                        <svg
                                            class="w-5 h-5 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                                            />
                                        </svg>
                                    {:else}
                                        <svg
                                            class="w-5 h-5 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                                            />
                                        </svg>
                                    {/if}
                                </button>
                            </div>
                        </div>

                        <!-- Ideas Section -->
                        <div
                            class="bg-zinc-800 p-2 rounded-lg flex items-center justify-between"
                        >
                            <span class="text-base text-white flot"
                                >Don't have ideas? 😫</span
                            >
                            <button
                                onclick={(openModal = !openModal)}
                                class="text-sm flot-b flex items-center gap-2 bg-[#ccfc7e] active:scale-95 transition text-black px-2 py-1 md:px-4 md:py-2 rounded-lg"
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
                                        d="M15 3.75L21 8.25M21 8.25L15 12.75M21 8.25H9.75a6 6 0 00-6 6v5.25"
                                    />
                                </svg>
                                Get Ideas
                            </button>
                        </div>
                    {:else if activeTab === "youtube"}
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="text-sm text-gray-300 mb-2 block"
                            >Youtube Link</label
                        >
                        <input
                            bind:value={youtube}
                            placeholder="Enter Youtube video link"
                            type="url"
                            class="w-full bg-zinc-800 border-zinc-700 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-[#d4ff52] focus:border-[#d4ff52]"
                        />
                    {:else if activeTab === "url"}
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="text-sm text-gray-300 mb-2 block"
                            >Website/Article Link</label
                        >
                        <input
                            bind:value={url}
                            placeholder="Enter link"
                            type="url"
                            class="w-full bg-zinc-800 border-zinc-700 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-[#d4ff52] focus:border-[#d4ff52]"
                        />
                    {/if}

                    <!-- Tone Dropdown -->
                    <div class="space-y-2">
                        <label
                            for="tone"
                            class="text-sm text-gray-300 mb-2 block">Tone <b class="flot">OR</b> Use Voice</label
                        >
                        <div
                            class="relative"
                            use:clickOutside={() => (isOpen = false)}
                        >
                            <button
                                id="tone"
                                class="flot w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#d4ff52] text-left"
                                onclick={() => (isOpen = !isOpen)}
                            >
                                {selectedLabel}
                            </button>

                            {#if isOpen}
                                <div
                                    class="absolute z-10 w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden p-1"
                                >
                                    {#each options as option}
                                        <button
                                            class="w-full px-2 py-2 text-left text-white hover:bg-zinc-700 focus:bg-zinc-700 focus:outline-none rounded-md"
                                            onclick={() =>
                                                handleSelect(option.value)}
                                        >
                                            {option.label}
                                        </button>
                                    {/each}
                                   {#if data.apiData.has_voice}
                                   <button
                                   onclick={() =>
                                       handleSelect('Using your Voice')}
                                       class="w-full px-2 py-2 text-left text-black bg-[#ccfc7e] flot-b hover:bg-black focus:outline-none rounded-md"
                                   >
                                   🤖 Use Your Voice
                                   </button>
                                   {:else}
                                  <a href="/dashboard/voice">
                                    <button
                                   
                                    class="w-full px-2 py-2 text-left text-black bg-[#ccfc7e] flot-b hover:bg-black focus:outline-none rounded-md"
                                >
                                   🤖 Create your voice
                                   </button>
                                   </a>
                                   {/if}
                    
                                </div>
                            {/if}
                        </div>
                    </div>

                    <!-- CTA Input -->
                    <div class="space-y-2">
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="text-sm text-gray-300 mb-2 block"
                            >CTA</label
                        >
                        <textarea
                            id="cta"
                            bind:value={cta}
                            placeholder="Enter call-to-action..."
                            class="w-full min-h-[150px] bg-zinc-800 border-zinc-700 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-[#d4ff52]"
                        ></textarea>
                    </div>

                    <!-- Generate Button -->
                    <button
                        onclick={generatePost}
                        disabled={loading}
                        class="flot-b w-full bg-[#ccfc7e] active:scale-95 text-black font-semibold py-2 text-lg rounded-lg transition-all duration-200 flex items-center justify-center gap-2 relative bottom-[0]"
                    >
                        <div class="flex items-center justify-center gap-2">
                            {loading ? "Generating" : "Generate Viral Post"}
                            {#if loading}
                                <svg
                                    class="w-4 h-4 animate-spin"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        class="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    ></circle>
                                    <path
                                        class="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            {/if}
                        </div>
                    </button>
                </div>

                <!-- Right Section - Output -->
                <div
                    class="bg-zinc-800 rounded-lg p-1 md:p-4 min-h-[500px] border border-zinc-700 relative"
                >
                    {#if result}
                        <button
                            onclick={regenerate}
                            class="flot absolute top-0 right-0 bg-[#ccfc7e] active:scale-95 transition text-black font-bold py-1 px-2 md:px-2 md:py-1 rounded-md m-2 z-10"
                        >
                            <div class="flex items-center justify-center gap-2">
                                {loading_gen ? "" : "Regenerate"}
                                {#if loading_gen}
                                    <svg
                                        class="w-4 h-4 animate-spin"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            class="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            stroke-width="4"
                                        ></circle>
                                        <path
                                            class="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                {/if}
                            </div>
                        </button>
                    {/if}
                    <div
                        class="h-full flex items-center justify-center text-gray-400 p-1 md:p-4"
                    >
                        {#if result}
                            <LinkedinCard
                                title={result.title}
                                content={result.content}
                                id={result.id}
                                type={true}
                            />
                        {:else if activeTab == "text"}
                            <img
                                src="/loading.gif"
                                class="h-16 w-16"
                                alt="loading"
                            />
                        {:else if activeTab == "youtube"}
                            <img
                                src="/youtube.gif"
                                class="h-16 w-16"
                                alt="loading"
                            />
                        {:else}
                            <img
                                src="/web.gif"
                                class="h-16 w-16"
                                alt="loading"
                            />
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    #topic,
    #cta {
        resize: none;
    }

    @keyframes paging {
        to {
            transform: rotateY(-180deg);
        }
    }
</style>
