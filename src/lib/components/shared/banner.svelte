<script>
    let { text } = $props();
</script>
<div class="bg-[#ccfc7e] px-4 py-2 text-center fixed w-full" style="z-index: 9999999;">
    <p class="text-sm sm:text-sm font-semibold">
        {text}
        <a href="/login" class="underline font-medium hover:text-gray-700 flot">Get Started!</a>
    </p>
</div>