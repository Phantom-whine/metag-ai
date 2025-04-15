<script>
    import Navbar from "$lib/components/dashboard/Navbar.svelte";
    import { clickOutside } from "$lib/handler";

    let current = $state(0);
    let carousel;
    let showPopup = $state(false);
    function handleButtonClick() {
        showPopup = !showPopup;
    }

    function copyText(text) {
        navigator.clipboard.writeText(text);
    }

    // Sample slides data
    const slides = [
        { id: 1, title: "Getting Started", image: "/guide/1.png" },
        { id: 2, title: "Note", image: "/guide/2.png" },
        { id: 3, title: "Profile Optimization", image: "/guide/3.png" },
        { id: 4, title: "Profile Picture", image: "/guide/4.png" },
        { id: 5, title: "Profile Picture . 1", image: "/guide/5.png" },
        { id: 6, title: "Headline Optimization", image: "/guide/6.png" },
        { id: 7, title: "Using AI", image: "/guide/7.png" },
        { id: 8, title: "Using AI", image: "/guide/8.png" },
        { id: 9, title: "Finish", image: "/guide/9.png" },
        { id: 10, title: "About Section", image: "/guide/10.png" },
        { id: 11, title: "Using AI", image: "/guide/11.png" },
        { id: 12, title: "Finish", image: "/guide/12.png" },
        { id: 13, title: "Viral Post", image: "/guide/13.png" },
        { id: 14, title: "Getting Topics", image: "/guide/14.png" },
        { id: 15, title: "Gettin Topics", image: "/guide/15.png" },
        { id: 16, title: "Viral and Evergreen", image: "/guide/16.png" },
        { id: 17, title: "Metag AI", image: "/guide/17.png" },
        { id: 18, title: "Viral Post - 2", image: "/guide/18.png" },
        { id: 19, title: "Using AI", image: "/guide/19.png" },
        { id: 20, title: "Using AI", image: "/guide/20.png" },
        { id: 21, title: "What to Avoid", image: "/guide/21.png" },
        { id: 22, title: "Do's and Dont's", image: "/guide/22.png" },
        { id: 23, title: "Dont's", image: "/guide/23.png" },
        { id: 24, title: "Do's", image: "/guide/24.png" },
        { id: 25, title: "Thanks for Reading", image: "/guide/25.png" },
    ];

    function scrollTo(number) {
        current = index;
        if (carousel) {
            const container = carousel.querySelector(".carousel-container");
            if (container) {
                container.scrollTo({
                    left: container.clientWidth * index,
                    behavior: "smooth",
                });
            }
        }
    }

    function handleScroll() {
        if (carousel) {
            const container = carousel.querySelector(".carousel-container");
            if (container) {
                const scrollPos = container.scrollLeft;
                const slideIndex = Math.round(
                    scrollPos / container.clientWidth,
                );
                current = slideIndex;
            }
        }
    }
</script>

<Navbar />
<svelte:head>
    <title>Metag - Linkedin Guide</title>
</svelte:head>
<div class="max-w-[95%] md:max-w-5xl mx-auto mt-4 py-2 flex justify-between">
    <div class="flex items-center justify-end gap-4 flex-row-reverse">
        <!-- Header Text -->
        <h1 class="text-xl font-semibold text-white flot-b">LinkedIn Guide 🚀</h1>
    </div>
    <div>
        <div class="relative">
            <button
                class="flot border border-zinc-700 p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-white"
                onclick={handleButtonClick}
            >
                <span>Prompts</span>
            </button>

            {#if showPopup}
                <div
                    class="absolute right-0 mt-2 w-64 bg-zinc-800/95 backdrop-blur-sm border border-zinc-700 rounded-lg p-2 space-y-3 z-50 shadow-xl shadow-black/30 transition-all duration-200 origin-top"
                    use:clickOutside={handleButtonClick}
                >
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <div class="space-y-2">
                        <!-- Prompt Box 1 -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <div
                            class="group bg-zinc-900 p-3 rounded-md border border-zinc-700 hover:border-emerald-400/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-400/5 active:scale-[0.98] cursor-pointer relative overflow-hidden"
                            onclick={() =>
                                copyText(`"Generate 5-10 engaging LinkedIn headlines tailored to a user’s industry, expertise, and goals. The headlines should:

Be clear, concise (under 220 characters), and attention-grabbing.
Highlight expertise, achievements, and unique value.
Include relevant industry keywords for visibility.
Be formatted in different styles:
Professional & straightforward
Value-driven (How they help others)
Creative & unique
Short & impactful
User details:

Industry: [Marketing, Tech, SaaS, AI, Finance]
Role: [Software Engineer, Growth Marketer, AI Consultant]
Expertise: [SEO, Python, B2B Sales, UI/UX]
Biggest Achievement: [Grew a startup to $1M ARR, Helped 100+ businesses scale]
Target Audience: [Recruiters, Businesses, Entrepreneurs]
Tone: [Professional, Friendly, Bold, Witty]
Example structures:

🚀 [Role] | Helping [Target Audience] Achieve [Benefit] | [Key Skill]
📈 [Job Title] | Scaling [Businesses/Teams] with [Expertise]
🔥 [Role] | [Biggest Achievement] | Passionate About [Industry]
Generate high-quality LinkedIn headlines based on this info."`)}
                        >
                            <!-- Subtle hover effect -->
                            <div
                                class="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            ></div>

                            <div
                                class="flex justify-between items-center relative flot"
                            >
                                <span
                                    class="text-base font-medium text-zinc-100 flot"
                                    >Headline Prompt</span
                                >
                                <!-- svelte-ignore a11y_consider_explicit_label -->
                                <button
                                    class="text-zinc-400 hover:text-emerald-400 transition-colors duration-150 active:scale-90"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 copy-icon"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        fill="none"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2Z"
                                            class="transition-all duration-150"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- Prompt Box 2 -->
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <div
                            class="group bg-zinc-900 p-3 rounded-md border border-zinc-700 hover:border-emerald-400/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-400/5 active:scale-[0.98] cursor-pointer relative overflow-hidden"
                            onclick={() =>
                                copyText(`Generate a compelling, engaging, and professional LinkedIn "About" section based on the following details:

Name: [Optional]
Industry: [Tech, Marketing, AI, Finance, etc.]
Role: [Software Engineer, Growth Marketer, AI Consultant, etc.]
Key Skills & Expertise: [SEO, Python, B2B Sales, UI/UX, etc.]
Biggest Achievements: [Grew a startup to $1M ARR, Scaled 100+ businesses, etc.]
Mission/Passion: [Helping businesses grow, Making AI accessible, etc.]
Tone Preference: [Professional, Friendly, Storytelling, Witty, etc.]
Target Audience: [Recruiters, Clients, Entrepreneurs, Startups, etc.]
Requirements:
Start with a strong hook (e.g., a question, bold statement, or personal story).
Clearly showcase expertise, achievements, and unique value in an engaging way.
End with a CTA (Call to Action) (e.g., "Let’s connect!", "Looking to collaborate? DM me.").
Keep it concise yet impactful (around 150-250 words).
Example opening styles:

Storytelling: "I still remember my first project that changed everything..."
Bold Statement: "The future of [Industry] is changing, and I’m here to lead the way."
Value-Driven: "I help [Target Audience] achieve [Benefit] through [Expertise]."
Write a high-quality LinkedIn About section based on this information.`)}
                        >
                            <!-- Animated background effect -->
                            <div
                                class="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            ></div>

                            <div
                                class="flex justify-between items-center relative"
                            >
                                <span
                                    class="text-base font-medium text-zinc-100"
                                    >About Section prompt</span
                                >
                                <!-- svelte-ignore a11y_consider_explicit_label -->
                                <button
                                    class="text-zinc-400 hover:text-emerald-400 transition-colors duration-150 active:scale-90"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 copy-icon"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        fill="none"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2Z"
                                            class="transition-all duration-150"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>
<div class="md:max-w-5xl max-w-[95%] mx-auto bg-zinc-800 rounded-md mb-[20px]">
    <div class="w-full">
        <div class="container mx-auto px-6 py-6">
            <div class="flex flex-col lg:flex-row gap-1">
                <!-- Desktop Thumbnails -->
                <div class="hidden lg:block lg:w-1/4 h-[80vh] overflow-hidden">
                    <div
                        class="text-sm uppercase tracking-wider text-white flot mb-4"
                    >
                        Slide — {slides.length} Images
                    </div>

                    <div
                        class="h-[calc(80vh-40px)] overflow-y-auto pr-4 space-y-4"
                    >
                        {#each slides as slide, index (slide.id)}
                            <!-- svelte-ignore a11y_click_events_have_key_events -->
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <div
                                class="group flex items-center gap-4 py-2 cursor-pointer transition-opacity duration-300 border border-zinc-700 p-2 rounded-md bg-zinc-900"
                                class:opacity-100={current === index}
                                onclick={() => scrollTo(index)}
                            >
                                <div
                                    class="w-1 h-16 transition-colors duration-300 rounded-md"
                                    class:bg-zinc-900={current === index}
                                    class:dark:bg-white={current === index}
                                    class:bg-transparent={current !== index}
                                    class:group-hover:bg-zinc-200={current !==
                                        index}
                                    class:dark:group-hover:bg-zinc-700={current !==
                                        index}
                                ></div>

                                <div class="relative w-16 h-20 overflow-hidden">
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        class="object-cover w-full h-full border border-zinc-700 rounded-md"
                                        loading={index > 5 ? "lazy" : "eager"}
                                    />
                                </div>

                                <div class="flex flex-col">
                                    <span class="text-sm flot text-white"
                                        >{slide.title}</span
                                    >
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>

                <!-- Main Carousel -->
                <div class="lg:w-3/4 flex flex-col" bind:this={carousel}>
                    <div class="relative overflow-hidden w-full">
                        <div
                            class="carousel-container flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
                            onscroll={handleScroll}
                            style="scroll-behavior: smooth;"
                        >
                            {#each slides as slide (slide.id)}
                                <div
                                    class="w-full flex-shrink-0 snap-start relative h-[80vh]"
                                >
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        id="slide-{slide.id}"
                                        class="w-[450px] h-[540px] rounded-md mx-auto mb-2"
                                        loading={Math.abs(
                                            current - slides.indexOf(slide),
                                        ) <= 2
                                            ? "eager"
                                            : "lazy"}
                                    />
                                </div>
                            {/each}
                        </div>
                    </div>

                    <!-- Navigation Controls -->
                    <div class="flex items-center justify-between mt-6">
                        <div
                            class="flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 hover:border-white/20 transition-all duration-300"
                        >
                            <div
                                class="flex items-center text-white/90 font-medium"
                            >
                                <span
                                    class="text-lg font-semibold text-primary-500"
                                    >{current + 1}</span
                                >
                                <span class="mx-1.5 text-white/40">/</span>
                                <span class="text-sm text-white/70"
                                    >{slides.length}</span
                                >
                            </div>
                            <div
                                class="text-xs uppercase tracking-wider text-white/50 flot"
                            >
                                Slides
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile Thumbnails -->
            <div class="mt-8 lg:hidden">
                <div
                    class="text-sm uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4 font-light"
                >
                    Slide — {slides.length} Images
                </div>

                <div
                    class="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory"
                >
                    {#each slides as slide, index (slide.id)}
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <div
                            class="flex flex-col snap-start shrink-0 cursor-pointer transition-opacity duration-300 opacity-60 hover:opacity-90 w-20"
                            class:opacity-100={current === index}
                            onclick={() => scrollTo(index)}
                        >
                            <div
                                class="relative w-20 h-32 overflow-hidden mb-2"
                            >
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    class="object-cover w-full h-full"
                                    loading="lazy"
                                />
                            </div>
                            <span
                                class="text-xs text-zinc-400 dark:text-zinc-500"
                                >{index + 1}</span
                            >
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Add this style tag for custom animations -->
<style>
    @keyframes checkmark-bounce {
        0%,
        100% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.9);
        }
    }
    /* .copied-animation {
        animation: checkmark-bounce 0.4s ease-in-out;
    } */
</style>
