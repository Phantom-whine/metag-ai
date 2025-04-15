<script>
    let { title, description, id } = $props();
</script>
<div class="h-[80px]" id={id}></div>
<div class="text-center space-y-4">
    <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-white flot-b">
        {title}
    </h2>
    <p class="text-gray-500 md:max-w-3xl mx-auto max-w-[22rem]">
        {description}
    </p>
</div>
<div class="h-4"></div>