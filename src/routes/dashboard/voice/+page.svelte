<script>
    import Toast from "$lib/components/shared/Toast.svelte";
    import Navbar from "$lib/components/dashboard/Navbar.svelte";
    import axios from "axios";
    import Cookies from "js-cookie";
    import { onMount } from "svelte";

    let msg = $state();
    let type = $state();
    let { data } = $props();

    console.log(data);

    let post_1 = $state();
    let post_2 = $state();
    let post_3 = $state();
    let post_4 = $state();

    var use_hashtag = $state();
    var tone = $state();

    const API_URL = 'https://metag-prod-api-ql90k.kinsta.app';

    async function create_voice() {
        console.log({
            posts: [post_1, post_2, post_3, post_4],
            tone,
            use_hashtag,
        });
        try {
            const response = await axios.post(
                `${API_URL}/api/voice/create/`,
                {
                    posts: [post_1, post_2, post_3, post_4],
                    tone,
                    use_hashtag,
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("access")}`,
                    },
                },
            );
            let msg = data.apiData ? "Voice Edited" : "Voice Created";
            triggerToast("success", msg);
        } catch (error) {
            const errorMessage = "An error occured";
            triggerToast("error", errorMessage);
        }
    }

    onMount(() => {
        const has_voice = data.user.has_voice;
        if (data.apiData) {
            triggerToast("success", "Voice Loaded");
            post_1 = data.apiData.post_1;
            post_2 = data.apiData.post_2;
            post_3 = data.apiData.post_3;
            post_4 = data.apiData.post_4;

            tone = data.apiData.tone;
            use_hashtag = data.apiData.use_hastag;
        }
    });

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

    let isFormValid = $derived(post_1 && post_2 && post_3 && post_4 && tone);
</script>

<svelte:head>
    <title>Create Your Voice</title>
</svelte:head>
{#if msg}
    <Toast bind:message={msg} {type} />
{/if}
<Navbar username={data.user.fullname} />
<div class="w-full max-w-7xl mx-auto p-4 min-h-screen">
    <div class="max-w-7xl mx-auto py-4">
        <div class="flex items-center justify-end gap-4 flex-row-reverse">
            <!-- Header Text -->
            <h1 class="text-xl font-semibold text-white flot-b">
                Create Your Voice 📢
            </h1>
        </div>
    </div>
    <!--Content here-->
    <div class="bg-zinc-900 text-white rounded-xl p-4">
        <div class="p-2">
            <details>
                <summary class="flot-sm">Need Help Creating Your Voice?</summary
                >

                <p class="feint bg-black rounded-md p-2">
                    🎙️ Guide: Create Your Custom Voice for LinkedIn Posts<br />
                    <br />
                    Want to post on LinkedIn like you — but without the time and
                    stress of writing every post from scratch? This tool helps you
                    create a custom AI model that learns your voice and tone based
                    on your past posts. Here's how to get started:<br />
                    <br />
                    📌 Step 1: Paste 4 of Your LinkedIn Posts<br />
                    Why? We use these to understand your writing style, structure,
                    vocabulary, and what matters to you. It’s like teaching the AI
                    how you talk on LinkedIn. The more authentic the posts, the more
                    accurate your personalized model will be.<br />
                    ✅ Tip: Choose posts you’re proud of or ones that got good engagement!<br
                    />
                    <br />
                    🏷️ Step 2: Choose Whether You Want Hashtags Enabled<br />
                    Why? Some people love hashtags to boost reach and engagement,
                    while others prefer a cleaner look. This option gives you control
                    over the formatting of your future posts.<br />
                    🔧 You can change this setting anytime — you're not locked in!<br
                    />
                    <br />
                    🎯 Step 3: Pick the Tone You Want for Future Posts<br />
                    Why? Whether you want to sound professional, witty, inspirational,
                    or conversational — tone shapes how people feel when they read
                    your posts. This tells the AI how to "carry your voice" forward.<br
                    />
                    ✨ Common options: Confident, Friendly, Funny, Bold, Insightful,
                    etc.<br />
                    <br />
                    ✅ You’re Ready to Generate Posts!<br />
                    Once you complete these steps, the tool will build your custom
                    voice and start generating personalized LinkedIn posts tailored
                    to your brand, tone, and audience.<br />
                    <br />
                    💬 Why This Works:<br />
                    This approach balances authenticity (your own words and voice)
                    with automation (AI assistance), making it easier to stay consistent,
                    visible, and engaging on LinkedIn — without burning out.
                </p>
            </details>
        </div>
        <div class="grid lg:grid-cols-2 gap-4">
            <textarea
                placeholder="Post 1"
                style="height: 200px;"
                bind:value={post_1}
                class="w-full min-h-[120px] bg-zinc-800 border-zinc-700 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-[#d4ff52] focus border-[#d4ff52] pr-10"
            ></textarea>

            <textarea
                placeholder="Post 2"
                style="height: 200px;"
                bind:value={post_2}
                class="w-full min-h-[120px] bg-zinc-800 border-zinc-700 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-[#d4ff52] focus border-[#d4ff52] pr-10"
            ></textarea>

            <textarea
                placeholder="Post 3"
                style="height: 200px;"
                bind:value={post_3}
                class="w-full min-h-[120px] bg-zinc-800 border-zinc-700 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-[#d4ff52] focus border-[#d4ff52] pr-10"
            ></textarea>

            <textarea
                placeholder="Post 4"
                style="height: 200px;"
                bind:value={post_4}
                class="w-full min-h-[120px] bg-zinc-800 border-zinc-700 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-[#d4ff52] focus border-[#d4ff52] pr-10"
            ></textarea>
        </div>
        <div class="grid lg:grid-cols-2 gap-4 mt-4">
            <div class="bg-black p-2 w-full rounded-md">
                <label class="checkbox-container">
                    <input type="checkbox" bind:checked={use_hashtag} />
                    <span class="custom-checkbox"></span>
                    <span class="checkbox-label flot-b">Enable Hashtag</span>
                </label>
            </div>
            <div class="bg-black w-full rounded-md">
                <label class="checkbox-container">
                    <select
                        name="tone"
                        bind:value={tone}
                        class="bg-black rouneded-md w-full mt-2 flot-b"
                    >
                        {#each options as opt}
                            <option class="flot-b" hidden>Tone</option>
                            <option value={opt.value} class="flot-b"
                                >{opt.label}</option
                            >
                        {/each}
                    </select>
                </label>
            </div>
        </div>
        <button
            onclick={() => create_voice()}
            class="bg-[#ccfc7e] mt-4 text-black p-2 w-full rounded-md active:scale-95 transition flot-b"
            class:opacity-50={!isFormValid}
            class:cursor-not-allowed={!isFormValid}
            disabled={!isFormValid}
            >{#if data.apiData}
                Edit
            {:else}
                Create Voice
            {/if}</button
        >
    </div>
</div>

<style>
    .feint {
        color: rgb(216, 216, 216);
    }
    textarea {
        resize: none;
    }
    .checkbox-container {
        display: flex;
        align-items: center;
        cursor: pointer;
        user-select: none;
    }

    .custom-checkbox {
        position: relative;
        width: 20px;
        height: 20px;
        border: 2px solid #666;
        border-radius: 4px;
        margin-right: 10px;
        transition: all 0.3s ease;
    }

    .custom-checkbox::after {
        content: "";
        position: absolute;
        display: none;
        left: 6px;
        top: 2px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }

    input[type="checkbox"] {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    input[type="checkbox"]:checked ~ .custom-checkbox {
        background-color: #2196f3;
        border-color: #2196f3;
    }

    input[type="checkbox"]:checked ~ .custom-checkbox::after {
        display: block;
    }

    .checkbox-container:hover input[type="checkbox"] ~ .custom-checkbox {
        border-color: #444;
    }

    .checkbox-label {
        font-size: 18px;
    }
    ::placeholder {
        font-family: flot-b;
    }
    select {
        outline: none;
    }
</style>
