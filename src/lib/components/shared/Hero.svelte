<script>
    import HeroVideo from "./HeroVideo.svelte";
    let isLoggedIn = $props()
</script>
<main class="flex-1 relative top-8">
    <section class="container flex flex-col items-center justify-center space-y-8 pt-32 text-center mx-auto">
        <h1 class="w-fit text-white text-3xl sm:text-4xl tracking-tight md:text-6xl lg:text-7xl flot">
            Write the posts you need
            <span class="block text-muted-foreground">to grow on <span class="text-black bg-[#ccfc7e] rounded-md flot-b">LinkedIn.</span></span>
        </h1>
        
        <p class="max-w-[22rem] md:max-w-[42rem] leading-normal text-white sm:text-xl sm:leading-8">
            Never Run out of viral & evergreen post Topics
        </p>

        <div class="flex flex-col items-center space-y-4">
           {#if isLoggedIn}
           <a href="/login" class="active:scale-95 group relative inline-flex items-center justify-center gap-2 overflow-visible rounded-full border-2 border-black bg-[#ccfc7e] px-4 py-2 text-sm font-bold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">
            <!-- Popup Tooltip -->
            <span class="border border-zinc-700 absolute -top-10 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded-lg bg-black px-3 py-2 text-xs text-white opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100">
                Start winning today 🎉
                <div class="border-r border-b border-zinc-700 absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 transform bg-black"></div>
            </span>
        
            <!-- Button Content -->
            <span class="transition-transform duration-300 group-hover:translate-x-2 flot">
                Get Started for Free
            </span>
            
            <!-- Icon Container -->
            <span class="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-black p-1.5 text-white transition-all duration-300 group-hover:translate-x-1">
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
                    class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                >
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                </svg>
            </span>
        </a>
        {:else}
        <a href="/dashboard" class="active:scale-95 group relative inline-flex items-center justify-center gap-2 overflow-visible rounded-full border-2 border-black bg-[#ccfc7e] px-8 py-4 text-sm font-bold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">
            <!-- Popup Tooltip -->
            <span class="absolute -top-10 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded-lg bg-black px-3 py-2 text-xs text-white opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100">
                Start winning today 🎉
                <div class="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 transform bg-black"></div>
            </span>
        
            <!-- Button Content -->
            <span class="transition-transform duration-300 group-hover:translate-x-2 flot">
                Dashboard
            </span>
            
            <!-- Icon Container -->
            <span class="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-black p-1.5 text-white transition-all duration-300 group-hover:translate-x-1">
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
                    class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                >
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                </svg>
            </span>
        </a>
           {/if}
        </div>
    </section>
    <HeroVideo />
</main>