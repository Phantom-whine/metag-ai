<!-- Toast.svelte -->
<script>
  import { fly, fade, crossfade } from 'svelte/transition';
  import { cubicOut, elasticOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  
  let { 
    type = 'success', 
    message = $bindable(true),
    duration = 4000,
    position = 'top', // 'top', 'bottom'
    theme = 'dark'  // 'dark', 'light'
  } = $props();
  
  let timeoutId;
  let progress = $state(100);
  let intervalId;
  
  const close = () => {
    message = '';
    clearTimeout(timeoutId);
    clearInterval(intervalId);
  };
  
  onMount(() => {
    if (message) {
      startTimer();
    }
    
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  });
  
  $effect(() => {
    if (message) {
      progress = 100;
      startTimer();
    } else {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    }
  });
  
  function startTimer() {
    clearTimeout(timeoutId);
    clearInterval(intervalId);
    
    // Set timeout for auto-close
    timeoutId = setTimeout(close, duration);
    
    // Setup progress bar animation
    const startTime = Date.now();
    intervalId = setInterval(() => {
      const elapsed = Date.now() - startTime;
      progress = 100 - (elapsed / duration * 100);
      
      if (progress <= 0) {
        clearInterval(intervalId);
      }
    }, 16);
  }
  
  // Animation parameters
  const getTransitionParams = () => {
    return position === 'top' 
      ? { y: -100, duration: 600, easing: elasticOut } 
      : { y: 100, duration: 600, easing: elasticOut };
  };
</script>

{#if message}
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
  class="fixed {position === 'top' ? 'top-4' : 'bottom-4'} left-1/2 -translate-x-1/2 w-full max-w-xs z-[1000] backdrop-blur"
  onmouseenter={() => clearTimeout(timeoutId)}
  onmouseleave={() => startTimer()}
  in:fly={getTransitionParams()}
  out:fly={{ ...getTransitionParams(), duration: 400, easing: cubicOut }}
>
  <div 
    class="relative rounded-lg overflow-hidden shadow-md {theme === 'dark' ? 'bg-black border border-zinc-700/40' : 'bg-white/90 border border-zinc-100/50'} transform hover:scale-[1.01] active:scale-100 transition-all duration-150 ease-out ring-1 ring-black/5"
  >
    <!-- Progress bar -->
    <div 
      class="{type === 'error' ? 'bg-red-500/90' : type === 'warning' ? 'bg-amber-500/90' : 'bg-emerald-500/90'} h-1 relative"
    >
      <!-- svelte-ignore element_invalid_self_closing_tag -->
      <div 
        class="h-full bg-white/20 backdrop-blur-[0.5px] transition-[width] duration-300 ease-out" 
        style="width: {progress}%"
        transition:fade={{ duration: 200 }}
      />
    </div>
  
    <div class="p-3 flex items-center gap-3"> <!-- Changed from items-start to items-center -->
      <!-- Icon -->
      <div 
        class="flex-shrink-0"
        in:fade={{ duration: 300, delay: 200 }}
      >
        {#if type === 'error'}
          <div class="p-1 bg-red-500/10 rounded-md">
            <svg class="h-4 w-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
          </div>
        {:else if type === 'warning'}
          <div class="p-1 bg-amber-500/10 rounded-md">
            <svg class="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
          </div>
        {:else}
          <div class="p-1 bg-emerald-500/10 rounded-md">
            <svg class="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
          </div>
        {/if}
      </div>
      
      <!-- Message -->
      <div class="flex-1 min-w-0">
        <p 
          class="text-xs font-medium {theme === 'dark' ? 'text-zinc-100' : 'text-zinc-800'} leading-tight flot"
          in:fade={{ duration: 300, delay: 100 }}
        >
          {message}
        </p>
      </div>

      <!-- Close button -->
      <!-- svelte-ignore a11y_consider_explicit_label -->
      <button 
        onclick={close}
        class="flex-shrink-0 p-1 rounded-md {theme === 'dark' ? 'text-zinc-300 hover:text-white hover:bg-zinc-700/20' : 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100/50'} transition-colors focus:outline-none focus:ring-1 focus:ring-current"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
</div>
{/if}