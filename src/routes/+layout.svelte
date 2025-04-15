<script>
    import { onMount } from 'svelte';
    import '../src/custom.css';
    import '../src/output.css';
    import { initializeAuth } from '$lib/auth';
    import { isLoggedIn } from '$lib/auth';
  
    onMount(() => {
      if (isLoggedIn()) {
        initializeAuth();
      }
    });
  </script>
  
  <slot />