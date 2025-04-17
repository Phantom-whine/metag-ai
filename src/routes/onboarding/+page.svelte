<script>
  import { goto } from "$app/navigation";
  import Cookies from "js-cookie";
  import axios from "axios";

  // Reactive state
  let loading = $state(false);
  let current = $state(1);
  let submitted = $state();
  const API_URL = 'https://metag-prod-api-ql90k.kinsta.app';
  let formData = $state({
    userName: "",
    engagementRate: "",
    aiExperience: "",
    linkedinGoal: "",
    interests: [],
  });

  // Form validation and navigation
  const nextStep = () => {
    switch (current) {
      case 1:
        if (!formData.userName.trim()) return;
        break;
      case 2:
        if (!formData.engagementRate) return;
        break;
      case 3:
        if (!formData.aiExperience) return;
        break;
      case 4:
        if (!formData.linkedinGoal.trim()) return;
        break;
      case 5:
        if (formData.interests.length === 0) return;
        break;
    }
    if (current < 6) current += 1;
  };

  const prevStep = () => current > 1 && current--;

  const toggleInterest = (interest) => {
    formData.interests = formData.interests.includes(interest)
      ? formData.interests.filter((i) => i !== interest)
      : [...formData.interests, interest];
  };

  async function finishBoard() {
    loading = true;
    try {
      await axios.post(
        `${API_URL}/api/auth/set/`,
        {
          name: formData.userName,
          goal: formData.linkedinGoal,
          engagement_rate: formData.engagementRate,
          ai_experience: formData.aiExperience,
          interests: formData.interests,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access")}`,
          },
        },
      );
      localStorage.setItem("boarded", "true");
      goto("/dashboard");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed. Please try again.");
      loading = false;
    }
  }

  function downloadGuide() {
        const link = document.createElement('a');
        link.href = '/linkedin-guide-metag.pdf'; // PDF file in public directory
        link.download = 'linkedin-guide-metag.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
</script>
<svelte:head>
  <title>Metag - Onboarding</title>
</svelte:head>
<div class="absolute inset-0 overflow-hidden z-[-10]">
  <div class="absolute inset-0 stars-bg"></div>
</div>
<div class="min-h-screen flex items-center justify-center p-4">
  <div class="w-full max-w-md">
    <!-- Step 1: Name -->
    {#if current === 1}
      <div class="bg-zinc-900 rounded-lg shadow-md p-6">
        <div class="mb-6">
          <div class="flex items-center justify-between">
            <p class="text-sm text-white flot">Metag AI</p>
            <p class="text-sm text-white">Step 1 of 5</p>
          </div>
          <div class="w-full bg-black rounded-md h-fit mt-2">
            <!-- svelte-ignore element_invalid_self_closing_tag -->
            <div class="bg-[#ccfc7e] h-4 rounded-md" style="width: 20%" />
          </div>
        </div>

        <h2 class="text-xl font-bold text-white mb-6 flot">
          What should I call you?
        </h2>

        <div class="mb-6">
          <input
            type="text"
            class="w-full p-3 bg-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ccfc7e] text-white"
            placeholder="Enter your full name"
            bind:value={formData.userName}
          />
        </div>

        <div class="flex justify-end mt-8">
          <button
            class="bg-[#ccfc7e] text-black py-2 px-6 rounded-md hover:opacity-90 transition flot"
            onclick={nextStep}
          >
            Next
          </button>
        </div>
      </div>
    {/if}

    <!-- Step 2: Engagement Rate -->
    {#if current === 2}
      <div class="bg-zinc-900 rounded-lg shadow-md p-6">
        <div class="mb-6">
          <div class="flex items-center justify-between">
            <p class="text-sm text-white flot">Metag AI</p>
            <p class="text-sm text-white">Step 2 of 5</p>
          </div>
          <div class="w-full bg-black rounded-md h-fit mt-2">
            <!-- svelte-ignore element_invalid_self_closing_tag -->
            <div class="bg-[#ccfc7e] h-4 rounded-md" style="width: 40%" />
          </div>
        </div>

        <h2 class="text-lg font-bold text-white mb-4 flot">
          What is your engagement rate on LinkedIn?
        </h2>

        <div class="space-y-3 mb-6">
          {#each ["Less than 1%", "1-3%", "3-5%", "5-10%", "More than 10%", "I don't know"] as option}
            <button
              class="flot w-full p-3 text-left rounded-md transition-transform active:scale-95 {formData.engagementRate ===
              option
                ? 'bg-[#ccfc7e] text-black'
                : 'bg-zinc-800 text-white hover:bg-zinc-700'}"
              onclick={() => (formData.engagementRate = option)}
            >
              {option}
            </button>
          {/each}
        </div>

        <div class="flex justify-between items-center mt-8">
          <button
            class="text-white hover:text-gray-300 transition-colors"
            onclick={prevStep}
          >
            ← Back
          </button>
          <button
            class="flot bg-[#ccfc7e] text-black py-2 px-6 rounded-md hover:opacity-90 transition"
            onclick={nextStep}
          >
            Next
          </button>
        </div>
      </div>
    {/if}

    <!-- Step 3: AI Experience -->
    {#if current === 3}
      <div class="bg-zinc-900 rounded-lg shadow-md p-6">
        <div class="mb-6">
          <div class="flex items-center justify-between">
            <p class="text-sm text-white flot">Metag AI</p>
            <p class="text-sm text-white">Step 3 of 5</p>
          </div>
          <div class="w-full bg-black rounded-md h-fit mt-2">
            <!-- svelte-ignore element_invalid_self_closing_tag -->
            <div class="bg-[#ccfc7e] h-4 rounded-md" style="width: 60%" />
          </div>
        </div>

        <h2 class="text-lg font-bold text-white mb-4 flot">
          Do you have experience with AI software?
        </h2>

        <div class="space-y-3 mb-6">
          {#each ["Yes, extensive experience", "Yes, some experience", "No, but I'm interested", "No experience at all"] as option}
            <button
              class="w-full p-3 text-left rounded-md transition-transform active:scale-95 flot {formData.aiExperience ===
              option
                ? 'bg-[#ccfc7e] text-black'
                : 'bg-zinc-800 text-white hover:bg-zinc-700'}"
              onclick={() => (formData.aiExperience = option)}
            >
              {option}
            </button>
          {/each}
        </div>

        <div class="flex justify-between items-center mt-8">
          <button
            class="text-white hover:text-gray-300 transition-colors"
            onclick={prevStep}
          >
            ← Back
          </button>
          <button
            class="flot bg-[#ccfc7e] text-black py-2 px-6 rounded-md hover:opacity-90 transition"
            onclick={nextStep}
          >
            Next
          </button>
        </div>
      </div>
    {/if}

    <!-- Step 4: LinkedIn Goals -->
    {#if current === 4}
      <div class="bg-zinc-900 rounded-lg shadow-md p-6">
        <div class="mb-6">
          <div class="flex items-center justify-between">
            <p class="text-sm text-white flot">Metag AI</p>
            <p class="text-sm text-white">Step 4 of 5</p>
          </div>
          <div class="w-full bg-black rounded-md h-fit mt-2">
            <!-- svelte-ignore element_invalid_self_closing_tag -->
            <div class="bg-[#ccfc7e] h-4 rounded-md" style="width: 80%" />
          </div>
        </div>

        <h2 class="text-lg font-bold text-white mb-4 flot">
          What do you want to achieve on LinkedIn this year?
        </h2>

        <div class="mb-6">
          <!-- svelte-ignore element_invalid_self_closing_tag -->
          <textarea
            class="w-full p-3 bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ccfc7e] min-h-32 text-white"
            placeholder="Share your LinkedIn goals..."
            bind:value={formData.linkedinGoal}
          />
        </div>

        <div class="flex justify-between items-center mt-8">
          <button
            class="text-white hover:text-gray-300 transition-colors"
            onclick={prevStep}
          >
            ← Back
          </button>
          <button
            class="flot bg-[#ccfc7e] text-black py-2 px-6 rounded-md hover:opacity-90 transition"
            onclick={nextStep}
          >
            Next
          </button>
        </div>
      </div>
    {/if}

    <!-- Step 5: Interests -->
    {#if current === 5}
      <div class="bg-zinc-900 rounded-lg shadow-md p-6">
        <div class="mb-6">
          <div class="flex items-center justify-between">
            <p class="text-sm text-white flot">Metag AI</p>
            <p class="text-sm text-white">Step 5 of 5</p>
          </div>
          <div class="w-full bg-black rounded-md h-fit mt-2">
            <!-- svelte-ignore element_invalid_self_closing_tag -->
            <div class="bg-[#ccfc7e] h-4 rounded-md" style="width: 100%" />
          </div>
        </div>

        <h2 class="text-xl font-bold text-white mb-4 flot">
          What topics are you interested in?
        </h2>
        <p class="text-sm text-zinc-400 mb-6">Select all that apply</p>

        <div class="grid grid-cols-2 gap-3 mb-6">
          {#each ["Machine Learning", "Digital Marketing", "Leadership", "Career", "Entrepreneurship", "Remote Work", "Industry News", "Personal Branding"] as topic}
            <button
              class="p-3 rounded-md transition-transform active:scale-95 {formData.interests.includes(
                topic,
              )
                ? 'bg-[#ccfc7e] text-black'
                : 'bg-zinc-800 text-white hover:bg-zinc-700'}"
              onclick={() => toggleInterest(topic)}
            >
              <div class="flex items-center">
                <div
                  class="w-5 h-5 rounded border mr-2 flex items-center justify-center {formData.interests.includes(
                    topic,
                  )
                    ? 'bg-black border-zinc-500'
                    : 'border-zinc-400'}"
                >
                  {#if formData.interests.includes(topic)}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-[#ccfc7e]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  {/if}
                </div>
                <span class="flot">{topic}</span>
              </div>
            </button>
          {/each}
        </div>

        <div class="flex justify-between items-center mt-8">
          <button
            class="text-white hover:text-gray-300 transition-colors"
            onclick={prevStep}
          >
            ← Back
          </button>
          <button
            class="flot bg-[#ccfc7e] text-black py-2 px-6 rounded-md hover:opacity-90 transition"
            onclick={nextStep}
          >
            Next
          </button>
        </div>
      </div>
    {/if}

    <!-- Final Step -->
    {#if current === 6}
      <div class="bg-zinc-900 rounded-lg shadow-lg p-8 border border-zinc-700">
        <div class="mb-6">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center">
              <img src="/logo.png" class="w-8 h-8 mr-2" alt="Metag AI logo" />
              <p class="text-sm text-white font-medium flot">
                Brought to you By Metag AI
              </p>
            </div>
            <span
              class="bg-[#ccfc7e] text-black text-xs px-3 py-1 rounded-full font-medium"
              >Premium Guide</span
            >
          </div>
        </div>

        <h2 class="text-lg font-bold text-white mb-6 flot">
          Use this guide to optimize your LinkedIn account to grow
        </h2>

        <div class="mb-8 bg-zinc-800 rounded-lg p-4 border border-zinc-700">
          <div class="text-white">
            <div class="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ccfc7e"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                ></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <h3 class="font-bold text-lg ml-2 flot">LinkedIn Growth Blueprint</h3>
            </div>
            <div class="space-y-2 mb-4">
              {#each ["Profile optimization techniques", "Content strategy that works", "Networking best practices", "Lead generation tactics", "Engagement boosting methods"] as item}
                <div class="flex items-center text-zinc-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ccfc7e"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="mr-2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {item}
                </div>
              {/each}
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 sm:gap-4 flot">
          <button
              onclick={downloadGuide}
              class="relative bg-gradient-to-br from-[#b8f567] to-[#9dd64a] text-zinc-900 py-2 px-4 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 group"
          >
              <div class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 bg-white/30 transition-opacity"></div>
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 sm:w-6 sm:h-6 animate-bounce-once"
                  viewBox="0 0 24 24"
              >
                  <g fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <path stroke-linecap="round" d="M7 10l5 5l5-5m-5 5V3"/>
                  </g>
              </svg>
              <span class="relative">Download</span>
          </button>
      
          <button
              onclick={finishBoard}
              disabled={loading}
              class="relative bg-zinc-900/50 hover:bg-zinc-800/70 border-2 border-[#ccfc7e]/20 hover:border-[#ccfc7e]/40 text-white py-2 px-4 rounded-xl transition-all duration-300 font-medium text-sm sm:text-base flex items-center justify-center gap-2 group"
              aria-busy={loading}
          >
              <div class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 bg-[#ccfc7e]/10 transition-opacity"></div>
              
              {#if !loading}
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform"
                      viewBox="0 0 24 24"
                  >
                      <g fill="none" stroke="#ccfc7e" stroke-width="2">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                      </g>
                  </svg>
                  <span class="relative">Continue</span>
              {:else}
                  <div class="loader">
                  </div>
              {/if}
          </button>
      </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .loader {
    width: 20px;
    height: 12px;
    display: block;
    margin: auto;
    position: relative;
    border-radius: 4px;
    color: white;
    background: currentColor;
    box-sizing: border-box;
    animation: animloader 0.6s 0.3s ease infinite alternate;
  }
  .loader::after,
  .loader::before {
    content: "";
    box-sizing: border-box;
    width: 20px;
    height: 12px;
    background: currentColor;
    position: absolute;
    border-radius: 4px;
    top: 0;
    right: 110%;
    animation: animloader 0.6s ease infinite alternate;
  }
  .loader::after {
    left: 110%;
    right: auto;
    animation-delay: 0.6s;
  }

  @keyframes animloader {
    0% {
      width: 20px;
    }
    100% {
      width: 48px;
    }
  }
  .stars-bg {
    background-image: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.1) 1px,
      transparent 1px
    );
    background-size: 30px 30px;
  }
</style>
