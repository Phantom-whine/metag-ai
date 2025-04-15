<script>
  // Reactive state for sidebar collapsed state
  let { name, image, email, collapsed = $bindable() } = $props();

  // Navigation items with inline SVGs
  const navItems = $state([
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>`,
      label: "Dashboard",
      href: "/dashboard",
      active: true,
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path></svg>`,
      label: "Generate Post",
      href: "/dashboard/generate",
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>`,
      label: "Voice",
      href: "/dashboard/voice",
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
      label: "Guide",
      href: "/dashboard/guide",
    },
  ]);

  // Toggle sidebar function
  const toggleSidebar = () => {
    collapsed = !collapsed;
  };

  // SVG for chevron icons
  const chevronLeft = $state(
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>`,
  );

  const chevronRight = $state(
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>`,
  );
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
  />
</svelte:head>

<div class="relative" style="padding-top: 10px; padding-left: 5px;">
  <div
    class="bg-zinc-900 text-white transition-all duration-300 flex flex-col m-5 rounded-md shadow-lg relative overflow-hidden"
    class:w-16={collapsed}
    class:w-64={!collapsed}
    style="height:98vh; box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.15), 0 8px 24px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1); border: 1px solid rgba(255, 255, 255, 0.1);"
  >
    <!-- Logo section with toggle button in expanded state -->
    <div class="p-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-md rounded-full flex items-center justify-center"
        >
          <span class="text-white font-medium">
            <img src="/logo.png" alt="" class="w-full h-9" /></span
          >
        </div>
        {#if !collapsed}
          <span
            class="text-xl font-semibold tracking-tight flot-b text-white hidden md:inline"
            >Metag</span
          >
        {/if}
      </div>

      <!-- Toggle button in header - only visible in expanded state -->
      {#if !collapsed}
        <button
          class="bg-red-500 w-6 h-6 rounded-md text-white hover:bg-blue-700/70 hover:text-white shadow-sm transition-all duration-300 flex items-center justify-center"
          style="box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);"
          onclick={() => (collapsed = true)}
        >
          <i class="fas fa-times text-lg"></i>
        </button>
      {/if}
    </div>

    <!-- Navigation -->
    <nav class="flex-1 mt-6">
      <ul class="space-y-2">
        {#each navItems as item}
          <li class="flot hover:bg-zinc-800 m-1 rounded-md">
            <a
              href={item.href}
              class="flex items-center gap-3 px-4 py-3 transition-colors relative rounded-md mx-2"
              class:bg-gradient-to-r={item.active}
              class:from-blue-800={item.active}
              class:to-blue-700={item.active}
              class:shadow-sm={item.active}
            >
              <div class="h-5 w-5 min-w-5 drop-shadow-sm">
                {@html item.icon}
              </div>

              {#if !collapsed}
                <span class="drop-shadow-sm">{item.label}</span>
              {/if}
            </a>
          </li>
        {/each}

        <!-- Toggle button in navigation - only visible in collapsed state -->
        {#if collapsed}
          <li>
            <button
              onclick={() => (collapsed = false)}
              class="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-600/50 transition-colors relative rounded-md mx-2 text-blue-200 hover:text-white"
            >
              <div class="h-5 w-5 min-w-5 drop-shadow-sm">
                {@html chevronRight}
              </div>
            </button>
          </li>
        {/if}
      </ul>
    </nav>

    <!-- User profile -->
    <a href="/dashboard/profile" class="m-2">
      <div
        class="mt-auto p-2 flex items-center gap-3 transition-all duration-300 bg-black rounded-md hover:bg-zinc-800 transition-300"
        class:justify-center={collapsed}
      >
        <div
          class="h-8 w-8 rounded-md overflow-hidden transition-transform duration-300 hover:scale-110 shadow-md"
        >
          {#if image != "null"}
            <img src={image} alt={image} class="h-full w-full object-cover" />
          {:else}
            <div
              class="border-zinc-700 text-center h-full text-black"
              style="background-color: #ccfc7e;"
            >
              <p class="flot-b" style="font-size: 20px;">{name[0]}</p>
            </div>
          {/if}
        </div>

        {#if !collapsed}
          <div
            class="flex flex-col text-sm overflow-hidden transition-all duration-300"
            style="
            max-width: {collapsed ? '0' : '150px'};
            opacity: {collapsed ? 0 : 1};
            transform: translateX({collapsed ? '-10px' : '0'});
          "
          >
            <span
              class="font-medium whitespace-nowrap text-white drop-shadow-sm"
              >{name}</span
            >
            <span class="text-blue-200 text-xs whitespace-nowrap">{email}</span>
          </div>
        {/if}
      </div>
    </a>
  </div>
</div>

<!-- <style>
    /* Make sure SVGs inherit the text color */
    svg {
      width: 100%;
      height: 100%;
    }
  </style> -->
