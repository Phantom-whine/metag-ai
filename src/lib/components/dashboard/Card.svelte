<script>
    function removeTags(inputText) {
        // Remove all <br> and <p> tags (including closing tags)
        const cleanedText = inputText.replace(/<\/?\w+\s*\/?>/gi, '');
        let newtxt = cleanedText.replace(/<!---->/g, '');
        newtxt = newtxt.replace(/&amp;/g, '');
        newtxt = newtxt.replace(/&nbsp;/g, '');
        newtxt = newtxt.replace(/\]/g, '');     // Remove all ]
        newtxt = newtxt.replace(/\[/g, '');     // Remove all ]
        return newtxt;
    }
    let { title, body, date, id, onDelete, edited } = $props();
    let body_cleaned = $state(removeTags(body));
    let title_cleaned = removeTags(title);
    let open = $state(false)
</script>

<div class="bg-[#0a0a0a] rounded-2xl overflow-hidden transition-all flex flex-col h-full w-full shadow-lg hover:shadow-xl border border-zinc-700/50 hover:border-zinc-600">
    <div class="p-5 flex-1">
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
                <div class="relative">
                    <img src='/in.png' class="w-11 h-11 rounded-xl object-cover border-2 border-zinc-700 shadow-sm" alt="logo">
                    <div class="absolute -bottom-1 -right-1 bg-green-400 w-3 h-3 rounded-full border-2 border-zinc-900"></div>
                </div>
                <div>
                    <h3 class="font-semibold text-white text-base flot">Metag AI</h3>
                    <p class="text-xs text-zinc-400 font-medium inline">{date}</p>
                    {#if edited}
                        <p class="text-xs text-green-300 font-medium inline">(EDITED)</p>
                    {/if}
                </div>
            </div>
            <div class="relative">
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <button 
                    onclick={open=!open}
                    class="text-zinc-400 hover:text-white p-2 rounded-lg transition-colors hover:bg-zinc-800/50"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                </button>

                {#if open}
                    <div 
                        
                        class="absolute right-0 w-48 mt-1 bg-zinc-800 rounded-lg shadow-2xl border border-zinc-700 backdrop-blur-sm z-20 overflow-hidden"
                    >
                        <button 
                            onclick={() => onDelete(id)}
                            class="flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-zinc-700/50 w-full transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L6 9m6 9v-9m6 9v-9M4 6h16M9 6V4.5A1.5 1.5 0 0110.5 3h3A1.5 1.5 0 0115 4.5V6m-7.5 0h6M4 6h16M5 6h14v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6z"/>
                            </svg>
                            Delete Post
                        </button>
                    </div>
                {/if}
            </div>
        </div>
        <h4 class="text-lg font-semibold text-white mb-3 leading-snug flot">{title_cleaned}</h4>
        <p class="text-sm text-zinc-300/90 leading-relaxed line-clamp-3">{body_cleaned}</p>
    </div>
    <div class="px-5 pb-5">
        <a href="/dashboard/{id}">
            <button class="flot w-full flex items-center justify-center gap-2 text-base font-medium bg-[#ccfc7e] text-zinc-900 px-5 py-2 rounded-xl transition-all hover:translate-y-[-1px] active:translate-y-0 active:scale-[0.98] shadow-md hover:shadow-lg">
                <span>Open Post</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                </svg>
            </button>
        </a>
    </div>
</div>