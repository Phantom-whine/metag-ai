<script>
    import Navbar from "$lib/components/dashboard/Navbar.svelte";
    import CardSk from "$lib/components/dashboard/CardSk.svelte";
    import Sidebar from "$lib/components/dashboard/Sidebar.svelte";
    import { goto } from "$app/navigation";
    import { clearTokens } from "$lib/auth";
    import Card from "$lib/components/dashboard/Card.svelte";
    import ModalTopic from "$lib/components/dashboard/ModalTopic.svelte";
    import Toast from "$lib/components/shared/Toast.svelte";
    import { onMount } from "svelte";
    import Cookies from 'js-cookie';
    import axios from 'axios';
    import { page } from "$app/stores";
    import { tempStore } from "$lib/editor.js";
    import { get } from "svelte/store";
    import { clickOutside } from "$lib/handler";

    let { data } = $props();
    const API_URL = 'https://metag-prod-api-ql90k.kinsta.app';

    function updateQueryParam(key, value) {
        // Get the current query parameters or create an empty one
        const newParams = new URLSearchParams($page.url.search || "");

        // Set or update the specified parameter
        newParams.set(key, value);

        // Navigate to the new URL with properly formatted query parameters
        goto(`?${newParams.toString()}`, { replaceState: true });
    }
    
    let msg = $state();
    let type = $state();

    function triggerToast(type_arg, msg_arg){
        msg = msg_arg;
        type = type_arg
    }

    let posts = $state();
    let cur = $state(1);
    let next = $state();
    let prev = $state();
    let count = $state();

    async function fetchData(){
        posts = undefined;
        let frame = $page.url.searchParams.get("frame") || "most_recent";
        let pageNumber = $page.url.searchParams.get("page") || 1;
        try {
            const response = await axios.get(`${API_URL}/api/posts?frame=${frame}&page=${pageNumber}`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('access')}`
                }
            })
            posts = response.data.results;
            
            open = false;
            cur = pageNumber;
            next = response.data.next;
            prev = response.data.previous;
            count = response.data.count;
        } catch (error) {
            open = false;
            triggerToast('error', error.data.error || 'An error occured')
    }
    }
    $effect(fetchData);

    onMount(fetchData)
    onMount(()=>{
        Cookies.set('profile', data.user.profile)
    })

    const del_post = async (id) => {
    try {
      // Optimistically remove the post from the UI
      posts = posts.filter(post => post.id !== id); // Strict inequality

      // Send deletion request to the backend
      await axios.delete(`${API_URL}/api/posts/${id}/`, {
        headers: { 'Authorization': `Bearer ${Cookies.get('access')}` }
      });

      triggerToast('success', 'Post Deleted');
    } catch(err) {
      // Revert UI if deletion fails (undo optimistic update)
      triggerToast('error', 'Failed to delete post');
      console.error(err);
    }
  };

    let open = $state(false);
    let sortOption = $state("Most Recent");
    let openModal = $state(false);

    const logout = () => {
        clearTokens();
        goto("/");
    };
</script>
<svelte:head>
    <title>Metag - Go Viral</title>
</svelte:head>
{#if msg}
  <Toast bind:message={ msg } type={ type } />
{/if}
        <Navbar username={data.user.fullname} />
        <main
            class="container mx-auto px-4 py-16 max-w-full lg:max-w-6xl relative top-[40px]"
        >
            <h1 class="flot-b text-4xl md:text-5xl lg:text-6xl font-bold mb-16 bg-gradient-to-r from-[#ccfc7e] to-green-300 bg-clip-text text-transparent">
                Welcome {data.user.fullname || 'Expert'}
            </h1>
            <div class="space-y-6 sm:space-y-8">
                <div
                    class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0"
                >
                    <h2 class="text-2xl font-semibold flot text-white">My Posts</h2>
                    <div
                        class="flex flex-col md:flex-row space-y-1 md:space-y-0 sm:space-x-4 w-full sm:w-auto gap-2"
                    >
                        <div class="relative flex flex-row">
                            <button
                            onclick={() => open = !open}
                            class="float w-full sm:w-auto px-2 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 hover:scale-105 active:scale-95 transition"
                          >
                            <span>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="24" height="24">
                                <!-- Calendar body -->
                                <path d="M82,16h-9c0-3.3-2.7-6-6-6s-6,2.7-6,6H39c0-3.3-2.7-6-6-6s-6,2.7-6,6h-9c-5.5,0-10,4.5-10,10v54c0,5.5,4.5,10,10,10h64c5.5,0,10-4.5,10-10V26C92,20.5,87.5,16,82,16z" fill="black"/>
                                
                                <!-- Calendar page -->
                                <rect x="18" y="32" width="64" height="48" fill="white"/>
                                
                                <!-- Calendar dates (first row) -->
                                <rect x="25" y="40" width="12" height="10" rx="2" ry="2" fill="black"/>
                                <rect x="44" y="40" width="12" height="10" rx="2" ry="2" fill="black"/>
                                <rect x="63" y="40" width="12" height="10" rx="2" ry="2" fill="black"/>
                                
                                <!-- Calendar dates (second row) -->
                                <rect x="25" y="58" width="12" height="10" rx="2" ry="2" fill="black"/>
                                <rect x="44" y="58" width="12" height="10" rx="2" ry="2" fill="black"/>
                                <rect x="63" y="58" width="12" height="10" rx="2" ry="2" fill="black"/>
                              </svg>
                            </span>
                          </button>
                            {#if open}
                                <div
                                    use:clickOutside={()=>open = !open}
                                    class="flot absolute right-0 w-48 mt-2 p-2 top-[35px] bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                                >
                                    <div
                                        class="py-1"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="options-menu"
                                    >
                                        <button
                                            onclick={()=>updateQueryParam('frame', 'most_recent')}
                                            class="w-full rounded-md block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900 text-left"
                                            role="menuitem">Most recent</button
                                        >
                                        <button
                                        onclick={()=>updateQueryParam('frame', 'oldest')}
                                        class="w-full rounded-md block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900 text-left"
                                        role="menuitem">Oldest</button
                                    >
                                    </div>
                                </div>
                            {/if}
                        </div>
                        <a href="/dashboard/generate" data-sveltekit-prefetch>
                            <button
                            class="flot bg-[#ccfc7e] hover:scale-105 active:scale-95 transition text-black font-bold w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                            Create new
                        </button>
                        </a>
                    </div>
                </div>
                {#if posts}
                <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {#each posts as post (post.id)}
                        <Card 
                            title={post.title} 
                            body={post.content} 
                            date={post.time_ago} 
                            id={post.id}
                            edited={post.edited}
                            onDelete={(id)=>{
                                del_post(id);
                            }}
                        />
                    {:else}
                            {#each [1, 2, 3] as card}
                                <CardSk />
                            {/each}
                    {/each}
                </div>
                {:else}
                <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {#each [1, 2, 3] as card}
                        <CardSk />
                    {/each}
                </div>
                {/if}
            </div>
        
            <div class="flex items-center justify-center space-x-4 mt-8">
                <!-- svelte-ignore a11y_consider_explicit_label -->
                {#if prev}
                <button class="p-2 rounded-lg bg-[#ccfc7e]" onclick={()=>updateQueryParam('page', parseInt(cur)-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m15 18-6-6 6-6"/>
                    </svg>
                  </button>
                {/if}
              
               {#if cur}
                <span class="text-sm font-medium flot text-white">
                    Page {cur}
                </span>
               {/if}
              
                <!-- svelte-ignore a11y_consider_explicit_label -->
                {#if next}
                <button class="p-2 rounded-lg bg-[#ccfc7e]" onclick={()=>updateQueryParam('page', parseInt(cur)+1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </button>
                {/if}
              </div>
        </main>