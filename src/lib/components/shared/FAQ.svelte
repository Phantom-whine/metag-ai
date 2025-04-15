<!-- FAQ.svelte -->
<script>
    import { fly } from 'svelte/transition';
    import FeatureHead from './FeatureHead.svelte';

    let faqs = $state([
        {
            question: 'Restrictions (Please read)',
            answer: 'Our platform usage is subject to our terms and conditions.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>`
        },
        {
            question: 'Is this tool suitable for beginners?',
            answer: 'Yes, our platform is designed with beginners in mind, featuring an intuitive interface and helpful tutorials.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>`
        },
        {
            question: 'Is Metag Free',
            answer: 'Track your campaigns through our comprehensive analytics dashboard with real-time metrics and detailed reports.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>`
        }
    ]);

    function handleKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      faq.open = !faq.open;
    }
  }
</script>
<FeatureHead id='faq' title='FAQ' description='Potential Questions Answered'/>
<div class="max-w-[95%] md:max-w-2xl mx-auto mb-[200px] flot">
    <!-- FAQ Items -->
    <div class="space-y-4">
        {#each faqs as faq (faq.question)}
        <div 
        class="rounded-lg bg-black/95 transition-all duration-300 group shadow-lg hover:shadow-xl"
        role="region"
        aria-labelledby="faq-question"
      >
        <button
          id="faq-question"
          class="flex justify-between items-center w-full p-5 text-left focus:outline-none rounded-lg group-hover:text-white"
          onclick={() => faq.open = !faq.open}
          onkeydown={handleKeydown}
          aria-expanded={faq.open}
        >
          <div class="flex items-center gap-4">
            {#if faq.icon}
              <div 
                class="w-6 h-6 text-[#ccfc7e] transition-colors duration-300"
              >
              <svg class="w-full h-full mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {@html faq.icon}
              </svg>
              </div>
            {/if}
            <span class="font-medium text-white text-lg group-hover:text-white">
              {faq.question}
            </span>
          </div>
          
          <div 
            class="w-6 h-6 transition-transform duration-300 text-gray-400 group-hover:text-white flex-shrink-0"
            class:rotate-180={faq.open}
            aria-hidden="true"
          >
            <svg 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>
      
        {#if faq.open}
          <div
            transition:fly={{ y: -8, duration: 200 }}
            class="rounded-b-lg px-5 pb-5 pt-2 text-gray-300 group-hover:text-white/90 prose prose-invert max-w-none bg-black"
          >
            {faq.answer}
          </div>
        {/if}
      </div>
        {/each}
    </div>
</div>