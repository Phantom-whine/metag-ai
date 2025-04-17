<script>
    import Cookies from 'js-cookie';
    import axios from 'axios';
    import { getAccessToken } from '$lib/auth';
    import {clickOutside} from "$lib/handler";
    
    let { openModal=$bindable(false), onUse } = $props();
    const API_URL = 'https://metag-prod-api-ql90k.kinsta.app';

    let selectedField = $state(null);
    let loading = $state(false);
    let showDropdown = $state(false);
    let textContent = $state("");
    let topics = $state([]);

    const fields = [
        "Everyday Life",
        "Technology",
        "Work Life",
        "Healthcare",
        "Finance",
        "Education",
        "Entertainment",
        "Politics",
        "Engineering & Manufacturing",
        "Marketing & Advertising",
        "Science & Research",
        "Agriculture & Food",
        "Transportation & Logistics"
    ];

    async function generateTopics() {
        console.log(document.cookie)
        try {
            const res = await axios.post(`${API_URL}/api/posts/topics/`, 
                {
                    "field": selectedField,
                    "sub_field": textContent
                },{
                    headers:{
                        'Authorization': `Bearer ${Cookies.get('access')}`
                    }
                }
            )
            const data = res.data;
            topics = data.suggestions;
            loading = false;
        } catch (error) {
            loading = false;
            console.log(error)
        }
    }

    function useTopic(topic) {
        return onUse(topic);
    }
    
</script>

{#if openModal}
    <!-- Modal -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        style="z-index: 99999;"
    >
        <div class="bg-zinc-900 text-white rounded-xl w-full max-w-xl p-4" use:clickOutside={()=>{
            openModal = false
            showDropdown = false
        }}>
            <div class="space-y-4">
                <!-- Header -->
                <div class="flex justify-between items-center">
                    <h3 class="text-lg font-semibold flot">Get Viral Topics 😎</h3>
                    <button
                        onclick={() => {
                            openModal = false
                            showDropdown = false
                        }}
                        class="text-gray-400 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                <!-- Field Dropdown -->
                <div class="relative">
                    <button
                        onclick={() => (showDropdown = !showDropdown)}
                        class="flot w-full bg-zinc-800 border-zinc-700 rounded-lg p-2 text-left text-sm flex justify-between items-center"
                    >
                        <span>{selectedField || "Select a field"}</span>
                        <svg
                            class="w-4 h-4 transform transition-transform"
                            class:rotate-180={showDropdown}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>

                    {#if showDropdown}
                        <div
                            class="p-2 absolute z-10 w-full mt-1 bg-zinc-800 rounded-lg border border-zinc-700 max-h-48 overflow-y-auto"
                        >
                            {#each fields as field}
                                <button
                                    onclick={() => {
                                        selectedField = field;
                                        showDropdown = false;
                                    }}
                                    class="rounded-md w-full p-2 flot text-sm text-left hover:bg-zinc-700"
                                >
                                    {field}
                                </button>
                            {/each}
                        </div>
                    {/if}
                </div>

                <!-- Content Input -->
                <textarea
                    bind:value={textContent}
                    id="content"
                    placeholder="Anything Related (optional)"
                    class="w-full min-h-[120px] bg-zinc-800 border-zinc-700 rounded-lg p-3 text-sm text-white ouline-none focus:border-zinc-600 focus:border-3"
                ></textarea>

                <!-- Loading Button -->
                <button
                    onclick={async () => {
                        loading = true;
                        generateTopics();
                    }}
                    disabled={!selectedField || loading}
                    class="w-full bg-[#ccfc7e] flot active:scale-95 text-black font-medium rounded-lg p-3 text-sm transition-all relative"
                >
                    <div class="flex items-center justify-center gap-2">
                        {loading ? "Generating Topics" : "Generate Topics"}
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

                <!-- Generated Topics -->
                <div class="space-y-3">
                    {#each topics as topic}
                    <div class="group relative bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl p-4 shadow-lg hover:shadow-[0_0_20px_-5px_rgba(204,252,126,0.25)] hover:ring-2 hover:ring-[#ccfc7e] transition-all duration-300 ease-out hover:-translate-y-0.5">
                        <div class="flex justify-between items-center gap-2">
                            <span class="text-sm text-zinc-200 break-words">{topic.name}</span>
                            <span class="font-semibold text-[#d4ff52] text-sm tabular-nums shrink-0">
                                {topic.virality}%
                            </span>
                        </div>
                        
                        <div class="mt-3 space-y-2">
                            <div class="h-2 bg-zinc-800/50 rounded-full overflow-hidden">
                                <div 
                                    class="h-full bg-[#ccfc7e] rounded-full transition-all duration-700 ease-out"
                                    style={`width: ${topic.virality}%`}
                                    role="progressbar"
                                    aria-valuenow={topic.virality}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    <div class="w-full h-full bg-gradient-to-r from-[#ccfc7e] to-[#d4ff52] rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    
                        <button
                            onclick={() => useTopic(topic.name)}
                            class="flex items-center gap-1.5 bg-[#ccfc7e] hover:bg-[#c0f16d] active:bg-[#b5e663] absolute right-3 top-3 text-black px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105 shadow-sm"
                        >
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.14-3.667l3-3z"/>
                                <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.14 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z"/>
                            </svg>
                            Use
                        </button>
                    </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
{/if}
<style>
    #content{
        resize: none;
    }
</style>