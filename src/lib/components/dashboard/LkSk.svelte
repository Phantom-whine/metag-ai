<div class="w-full max-w-xl bg-black rounded-2xl animate-pulse">
    <!-- Header Skeleton -->
    <div class="p-4">
        <div class="flex justify-between items-start">
            <div class="flex gap-3">
                <!-- Avatar Skeleton -->
                <div class="h-12 w-12 rounded-full bg-zinc-800"></div>
                
                <!-- Profile Info Skeleton -->
                <div class="space-y-2 pt-1">
                    <div class="h-4 w-32 bg-zinc-800 rounded mb-2"></div>
                    <div class="h-3 w-24 bg-zinc-800 rounded"></div>
                    <div class="flex gap-2 pt-1">
                        <div class="h-3 w-16 bg-zinc-800 rounded"></div>
                        <div class="h-3 w-3 bg-zinc-800 rounded"></div>
                        <div class="h-3 w-4 bg-zinc-800 rounded"></div>
                    </div>
                </div>
            </div>
            
            <!-- Button Skeleton -->
            <div class="flex gap-2 pt-1">
                <div class="h-8 w-20 bg-zinc-800 rounded-md"></div>
                <div class="h-8 w-8 bg-zinc-800 rounded-md"></div>
            </div>
        </div>
    </div>

    <!-- Content Skeleton -->
    <div class="px-4 pb-4 space-y-4">
        <div class="space-y-3">
            <div class="h-4 w-full bg-zinc-800 rounded"></div>
            <div class="h-4 w-4/5 bg-zinc-800 rounded"></div>
            <div class="h-4 w-3/4 bg-zinc-800 rounded mt-2"></div>
        </div>
        <div class="h-4 w-16 bg-zinc-800 rounded ml-1"></div>
    </div>

    <!-- Engagement Section Skeleton -->
    <div class="px-4 pb-4">
        <div class="flex justify-between items-center pt-4">
            <div class="flex gap-3 items-center">
                <div class="h-9 w-9 bg-zinc-800 rounded-full"></div>
                <div class="h-9 w-9 bg-zinc-800 rounded-full"></div>
                <div class="h-9 w-9 bg-zinc-800 rounded-full"></div>
                <div class="h-4 w-24 bg-zinc-800 rounded ml-3"></div>
            </div>
            <div class="flex items-center gap-3">
                <div class="h-4 w-16 bg-zinc-800 rounded"></div>
                <div class="h-6 w-6 bg-zinc-800 rounded-md"></div>
            </div>
        </div>
    </div>

    <!-- Shimmer Overlay -->
    <div class="shimmer-overlay"></div>
</div>
<style>
    .animate-pulse {
        position: relative;
        overflow: hidden;
    }

    .shimmer-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.05),
            transparent
        );
        animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(100%);
        }
    }
</style>