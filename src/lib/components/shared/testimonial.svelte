<script>
    import FeatureHead from "./FeatureHead.svelte";
    let testimonials = $state([
        {
            author: {
                name: "Hikmet Atçeken",
                handle: "@hatceken",
                image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nzTcyw6TAU6UvKofLgUmTRBTF1JC2x.png",
            },
            content:
                "Pulsefy's our daily tool to bypass averages and reveal true insights, for the whole team!",
            likes: 42,
            comments: 5,
        },
        {
            author: {
                name: "Arda Guler",
                handle: "@ardaguler_",
                image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nzTcyw6TAU6UvKofLgUmTRBTF1JC2x.png",
            },
            content:
                "Pulsefy levels the analytics field for our team, enabling both beginners and pros to easily bypass average data and uncover the actionable insights that truly shape our marketing strategies.",
            likes: 89,
            comments: 12,
        },
        {
            author: {
                name: "Maria Ancelotti",
                handle: "@maria_ancelotti",
                image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nzTcyw6TAU6UvKofLgUmTRBTF1JC2x.png",
            },
            content:
                "From novice to pro, Pulsefy helps our team uncover the extraordinary in our marketing data!",
            likes: 56,
            comments: 8,
        },
        {
            author: {
                name: "Ragip Diler",
                handle: "@rgdiler",
                image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nzTcyw6TAU6UvKofLgUmTRBTF1JC2x.png",
            },
            content:
                "Pulsefy empowers our whole team, techies or not, to dive into marketing analytics and spot the insights that really matter—no more average data!",
            likes: 73,
            comments: 9,
        },
        {
            author: {
                name: "Jenny Wilson",
                handle: "@wilson_jenny_19",
                image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nzTcyw6TAU6UvKofLgUmTRBTF1JC2x.png",
            },
            content:
                "Pulsefy's user-friendly analytics let our whole team, regardless of skill, bypass averages to unearth and act on true, game-changing marketing insights every day.",
            likes: 102,
            comments: 15,
        },
        {
            author: {
                name: "Guy Hawkins",
                handle: "@ghawkins",
                image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nzTcyw6TAU6UvKofLgUmTRBTF1JC2x.png",
            },
            content:
                "Pulsefy is a game-changer for our team—easy for beginners and powerful for digging beyond average data. It's our daily ally in unearthing those pivotal marketing insights that really drive strategy!",
            likes: 67,
            comments: 7,
        },
    ]);
</script>
<FeatureHead title='WALL OF LOVE 😍' description='If you are reading this i love you' id='testimonials'/>
<div class="container px-4 py-8 mx-auto">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {#each testimonials as testimonial, index}
            <div
                class="bg-white border shadow-none hover:shadow-md transition-all duration-300 rounded-[40px] {index %
                    3 ===
                1
                    ? 'lg:translate-y-12'
                    : ''}"
            >
                <div class="p-4 flex flex-col h-full">
                    <div class="flex items-start justify-between mb-4">
                        <div
                            class="flex items-center gap-3 bg-black text-white rounded-full p-1 pr-4 w-fit"
                        >
                            <div
                                class="relative h-10 w-10 rounded-full border-2 border-white overflow-hidden"
                            >
                                <img
                                    src={testimonial.author.image}
                                    alt={testimonial.author.name}
                                    class="rounded-full object-cover absolute inset-0 w-full h-full"
                                />
                            </div>
                            <div>
                                <p class="font-semibold text-sm">
                                    {testimonial.author.name}
                                </p>
                                <p class="text-xs text-gray-300">
                                    {testimonial.author.handle}
                                </p>
                            </div>
                        </div>
                        <div class="rounded-full p-1.5 border border-gray-200">
                            <i
                                data-lucide="twitter"
                                class="h-4 w-4 text-gray-400"
                            ></i>
                        </div>
                    </div>
                    <p class="text-gray-900 flot leading-relaxed flex-grow">
                        {testimonial.content}
                    </p>
                    <!-- <div class="flex items-center space-x-4 mt-4">
                        <div class="flex items-center space-x-1">
                            <i data-lucide="heart" class="h-4 w-4 text-gray-400"
                            ></i>
                            <span class="text-sm text-gray-500"
                                >{testimonial.likes}</span
                            >
                        </div>
                        <div class="flex items-center space-x-1">
                            <i
                                data-lucide="message-circle"
                                class="h-4 w-4 text-gray-400"
                            ></i>
                            <span class="text-sm text-gray-500"
                                >{testimonial.comments}</span
                            >
                        </div>
                    </div> -->
                </div>
            </div>
        {/each}
    </div>
</div>
