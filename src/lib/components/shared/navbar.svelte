<script>
    import { cubicOut } from 'svelte/easing';
    import {clickOutside} from "$lib/handler";

    let showMenu = $state(false);
    let isLoggedIn = $props()

    // Custom transition for scale + fade
    function scaleFade(node, { delay = 0, duration = 200, easing = cubicOut }) {
        return {
            delay,
            duration,
            easing,
            css: (t) => `
                opacity: ${t};
                transform: scale(${0.95 + t * 0.05});
            `
        };
    }
</script>

<nav class="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4 sm:px-6 lg:px-8">
    <div class="relative rounded-[14px] bg-black backdrop-blur-md border border-white/10 shadow-lg">
        <div class="container mx-auto flex h-16 items-center justify-between px-4">
            <!-- Logo -->
            <a href="/" class="flex items-center space-x-2 z-50">
                <img src="/logo.png" alt="DallFin Logo" class="w-10 h-10 rounded-md" loading="lazy">
                <span class="text-xl font-bold text-white flot-b">Metag</span>
            </a>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex items-center space-x-8">
                <a href="#features" class="text-sm text-gray-300 hover:text-white transition-colors duration-200">Features</a>
                <a href="#benefits" class="text-sm text-gray-300 hover:text-white transition-colors duration-200">Benefits</a>
                <a href="#testimonials" class="text-sm text-gray-300 hover:text-white transition-colors duration-200">Testimonials</a>
                <a href="#pricing" class="text-sm text-gray-300 hover:text-white transition-colors duration-200">Pricing</a>
                <a href="#faq" class="text-sm text-gray-300 hover:text-white transition-colors duration-200">FAQ</a>
            </div>

            <!-- Desktop CTA -->
            <div class="hidden md:flex items-center space-x-4">
                {#if isLoggedIn}
                <a href="/login" class="hover:scale-105 inline-flex items-center justify-center rounded-lg bg-[#ccfc7e] px-5 py-2.5 text-sm font-medium text-black flot transition-all active:scale-95">
                    Login
                </a>
                {:else}
                <a href="/dashboard" class="hover:scale-105 inline-flex items-center justify-center rounded-lg bg-[#ccfc7e] px-5 py-2.5 text-sm font-medium text-black flot transition-all active:scale-95">
                    Dashboard
                </a>
                {/if}
            </div>

            <!-- Mobile Menu -->
            <div class="md:hidden relative">
                <button
                    class="text-white hover:opacity-80 transition-opacity"
                    onclick={() => {
                        showMenu = !showMenu;
                    }}
                    aria-label="Toggle menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>

                <!-- Dropdown Menu -->
                {#if showMenu}
                    <div
                        use:clickOutside={()=>showMenu = !showMenu}
                        in:scaleFade={{ duration: 200 }}
                        out:scaleFade={{ duration: 150 }}
                        class="absolute right-0 top-full mt-2 w-64 origin-top-right rounded-[14px] bg-black backdrop-blur-lg border border-white/10 shadow-xl py-4"
                    >
                        <div class="flex flex-col space-y-4 px-4">
                            <a href="#features" class="text-sm text-gray-300 hover:text-white transition-colors duration-200">Features</a>
                            <a href="#benefits" class="text-sm text-gray-300 hover:text-white transition-colors duration-200">Benefits</a>
                            <a href="#testimonials" class="text-sm text-gray-300 hover:text-white transition-colors duration-200">Testimonials</a>
                            <a href="#pricing" class="text-sm text-gray-300 hover:text-white transition-colors duration-200">Pricing</a>
                            <a href="#faq" class="text-sm text-gray-300 hover:text-white transition-colors duration-200">FAQ</a>
                            <a href="/login" class="mt-2 mx-4 inline-flex items-center justify-center rounded-lg bg-[#ccfc7e] px-4 py-2.5 text-sm font-medium text-black transition-all hover:opacity-90 active:scale-95">
                                Get Started
                            </a>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</nav>