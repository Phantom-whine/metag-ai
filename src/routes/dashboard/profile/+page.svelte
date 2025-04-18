<script>
  import { onMount } from "svelte";
  import Cookies from "js-cookie";
  import { clearTokens } from "$lib/auth";
  import Navbar from "$lib/components/dashboard/Navbar.svelte";
  import axios from "axios";
  import { clickOutside } from "$lib/handler";

  let { data } = $props();
  let loading = $state(false);
  let showConfirm = $state(false);
  const API_URL = 'https://metag-prod-api-ql90k.kinsta.app';

  console.log(data)

  const logout = () => {
    clearTokens();
    goto("/");
  };

  const plans = [
    {
      name: "Basic",
      tokens: "30",
      features: ["Basic API Access", "Community Support"],
      current: false,
    },
    {
      name: "Pro",
      tokens: "90",
      features: [
        "Advanced API Access",
        "Priority Support",
        "Custom Integrations",
      ],
      current: true,
    },
    {
      name: "Plus",
      tokens: "150",
      features: ["Dedicated Support", "Custom Solutions", "SLA Guarantee"],
      current: false,
    },
  ];
  let profile_url = $state();
  onMount(() => {
    profile_url = Cookies.get("profile");
  });
  $effect(() => {
    profile_url;
  });

  async function del() {
    loading = true;
    try {
      const response = await axios.delete(
        `${API_URL}/api/auth/delete-account/`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access")}`,
          },
        },
      );
      logout();
    } catch (error) {
      loading = false;
    }
  }
  function delAccount() {
    showConfirm = !showConfirm;
  }
</script>

<svelte:head>
  <title>Metag AI - Profile</title>
</svelte:head>

<Navbar />
<div class="max-w-[95%] md:max-w-4xl mx-auto mt-6 py-2">
  <div class="flex items-center justify-end gap-4 flex-row-reverse">
    <!-- Header Text -->
    <!-- <h1 class="text-xl font-semibold text-white flot-b">
      {data.user.fullname}'s Profile
    </h1> -->
  </div>
</div>
<div class="min-h-screen flex items-center justify-center flot mb-16">
  <div
    class="w-full max-w-[95%] md:max-w-4xl bg-card rounded-lg shadow-sm bg-black text-white"
  >
    <div class="pt-6 px-6">
      <div class="flex flex-col items-center space-y-8">
        <!-- Profile Section -->
        <div class="flex flex-col items-center space-y-8 w-full">
          <!-- Avatar Section -->
          <div class="relative group">
            <div
              class="h-28 w-28 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden ring-2 ring-zinc-700 ring-offset-4 ring-offset-zinc-950 transition-all hover:ring-[#ccfc7e] hover:scale-105"
            >
              {#if profile_url}
                <!-- svelte-ignore a11y_img_redundant_alt -->
                <img
                  src={profile_url}
                  alt="Profile picture"
                  class="w-full h-full object-cover"
                />
              {:else}
                <span class="font-medium text-2xl text-zinc-300">JD</span>
              {/if}
            </div>
            {#if !profile_url}
              <div class="absolute inset-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  class="absolute text-zinc-600"
                >
                  <path d="M18 20a6 6 0 0 0-12 0" />
                  <circle cx="12" cy="10" r="4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
            {/if}
          </div>

          <!-- Profile Info -->
          <div class="space-y-2 text-center">
            <h1
              class="flot-b text-3xl font-bold bg-gradient-to-r from-[#ccfc7e] to-green-300 bg-clip-text text-transparent"
            >
              {data.user.fullname}
            </h1>
            <div class="flex items-center justify-center gap-2 text-zinc-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="flex-shrink-0"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                />
                <path d="m22 6-10 7L2 6" />
              </svg>
              <span class="text-sm">{data.user.email}</span>
            </div>
          </div>

          <!-- Token Usage -->
          <div class="w-full max-w-md space-y-4">
            <div class="flex justify-between items-center px-1">
              <span class="text-sm font-medium text-zinc-300">Token Usage</span>
              <div class="flex items-center gap-2">
                <span
                  class="text-xs font-medium text-[#ccfc7e] bg-[#ccfc7e]/10 px-2 py-1 rounded-full"
                >
                  75%
                </span>
                <span class="text-sm text-zinc-400">90 Posts</span>
              </div>
            </div>

            <div class="relative">
              <div class="h-4 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  class="h-full bg-[#ccfc7e] transition-all duration-500 ease-out rounded-full"
                  style="width: 75%"
                ></div>
              </div>
            </div>

            <p class="text-xs text-zinc-500 text-center font-medium">
              Renewal in
              <span class="text-[#ccfc7e]">15 days</span> •
              <button class="hover:text-emerald-300 transition-colors">
                Upgrade plan
              </button>
            </p>
          </div>
        </div>

        <!-- Plans Section -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {#each plans as plan}
            <div
              class="p-6 rounded-xl transition-all border border-zinc-800"
              class:border-2={plan.current}
              class:border-[#ccfc7e]={plan.current}
              class:bg-zinc-900={plan.current}
              class:bg-zinc-950={!plan.current}
              class:hover:border-zinc-600={!plan.current}
            >
              <div class="flex flex-col h-full">
                <div class="flex justify-between items-start mb-6">
                  <div>
                    <h3 class="text-2xl font-bold text-zinc-100 mb-1">
                      {plan.name}
                    </h3>
                    <p class="text-lg font-semibold text-[#ccfc7e]">
                      {plan.tokens}
                      <span class="text-sm text-zinc-400">posts/month</span>
                    </p>
                  </div>
                  {#if plan.current}
                    <span
                      class="inline-flex items-center gap-1.5 rounded-full bg-[#ccfc7e]/20 px-3 py-1 text-sm font-medium text-[#ccfc7e] border border-[#ccfc7e]/30"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                      Active
                    </span>
                  {/if}
                </div>

                <ul class="space-y-3 mb-8 flex-1">
                  {#each plan.features as feature}
                    <li class="flex items-center text-zinc-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="mr-3 text-[#ccfc7e]"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      {feature}
                    </li>
                  {/each}
                </ul>

                <button
                  class="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors group"
                  class:bg-[#ccfc7e]={plan.current}
                  class:hover:bg-emerald-300={plan.current}
                  class:bg-zinc-800={!plan.current}
                  class:hover:bg-zinc-700={!plan.current}
                >
                  {#if plan.current}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="text-zinc-900"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                    <span class="text-zinc-900">Current Plan</span>
                  {:else}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="text-[#ccfc7e] group-hover:translate-x-1 transition-transform"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    <span class="text-zinc-100">Choose Plan</span>
                  {/if}
                </button>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="p-6 mt-6 flex gap-2">
      <div class="w-full">
        <button
          onclick={logout}
          class="w-full flex items-center justify-center gap-2 px-6 py-3.5 font-medium rounded-lg transition-all
       bg-red-500/90 hover:bg-red-500/80 active:scale-[0.98]
       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50
       group shadow-sm shadow-red-500/20 hover:shadow-red-500/30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-[18px] w-[18px] translate-x-[0.5px] group-hover:translate-x-0 transition-transform"
          >
            <path
              d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
            />
          </svg>
          <span class="text-red-50 tracking-wide relative">
            Logout
            <span
              class="absolute bottom-0 left-0 w-full h-px bg-red-300/50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
            ></span>
          </span>
        </button>
      </div>
      <div class="group relative w-full">
        <div class="relative">
          <button
            onclick={delAccount}
            disabled={loading}
            class="w-full flex items-center justify-center gap-2 px-6 py-3.5 font-medium rounded-lg transition-all
                   bg-zinc-800 hover:bg-zinc-700/80 active:scale-[0.98]
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/50
                   shadow-sm shadow-zinc-500/20 hover:shadow-zinc-500/30
                   {loading ? 'opacity-75 cursor-not-allowed' : ''}"
          >
            {#if !loading}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-[18px] w-[18px] translate-x-[0.5px] group-hover:translate-x-0 transition-transform"
              >
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
              </svg>
              <span class="tracking-wide relative"> Delete Account </span>
            {:else}
              <div class="py-2">
                <span class="loader"></span>
              </div>
            {/if}
          </button>

          {#if showConfirm}
            <div
              use:clickOutside={delAccount}
              class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-zinc-900 rounded-lg
                     shadow-lg border border-zinc-800 z-10 after:content-[''] after:absolute after:bottom-[-5px] after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0 after:border-l-[5px] after:border-l-transparent after:border-r-[5px] after:border-r-transparent after:border-t-[5px] after:border-t-gray-800"
            >
              <div class="text-lg text-zinc-300 mb-2">Are you sure?</div>
              <div class="flex gap-2">
                <button
                  onclick={del}
                  class="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm
                         transition-colors w-full"
                >
                  Yes
                </button>
                <button
                  onclick={delAccount}
                  class="px-3 py-1 bg-zinc-700 hover:bg-zinc-600 rounded text-white text-sm
                         transition-colors w-full"
                >
                  No
                </button>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .loader {
    width: 20px;
    height: 10px;
    display: block;
    margin: auto;
    position: relative;
    border-radius: 10px;
    color: #fff;
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
</style>
