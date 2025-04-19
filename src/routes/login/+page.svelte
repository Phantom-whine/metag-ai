<script>
    import Google from "$lib/components/auth/Google.svelte";
</script>

<svelte:head>
    <title>Start Wining Today - Metag</title>
    <meta name="description" content="Sign in to unlock AI tools that help you create engaging LinkedIn posts, brainstorm content ideas, and write in a voice that’s uniquely yours.">
</svelte:head>
<div class="dark bg-black h-dvh font-sans">
    <div
        class="min-h-screen flex flex-col items-center justify-center relative"
    >
        <!-- Stars background -->
        <div class="absolute inset-0 overflow-hidden">
            <div class="absolute inset-0 stars-bg"></div>
        </div>

        <!-- Main content -->
        <div class="flex flex-col items-center z-10 w-full max-w-sm px-4">
            <!-- Logo -->
            <div
                class="w-[72px] h-[72px] mb-6 rounded-2xl flex items-center justify-center"
            >
                <img
                    src="/logo.png"
                    alt="DallFin Logo"
                    class="w-full"
                    loading="lazy"
                />
            </div>

            <!-- Title -->
            <h1 class="text-3xl flot text-white mb-8">Continue to Metag</h1>

            <!-- Buttons -->
            <div class="w-full space-y-3">
                <!-- Google Sign In Button -->
                <Google />
            </div>

            <!-- Footer text -->
            <p class="text-zinc-500 text-sm mt-6 text-center">
                By continuing, you agree to Metag's
                <a href="/terms" class="text-zinc-400 hover:text-white underline"
                    >Terms of Service</a
                >
                and
                <a href="/privacy" class="text-zinc-400 hover:text-white underline"
                    >Privacy Policy</a
                >.
            </p>
        </div>
    </div>
</div>

<style>
    .stars-bg {
        background-image: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.1) 1px,
            transparent 1px
        );
        background-size: 30px 30px;
    }
</style>
