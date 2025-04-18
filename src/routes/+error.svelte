<svelte:head>
  <title>Sorry This Page Does Not Exist</title>
</svelte:head>
<div class="page-container">
    <article class="not-found-card">
        <h1 class="card-heading flot">Page Not Found</h1>
        <p class="card-text">The requested page could not be located. Please verify the address or navigate back to the main page.</p>
       <a href="/">
        <button
        class="px-4 py-1 rounded-lg font-medium bg-[#ccfc7e] hover:bg-[#a9e242] text-zinc-900
           focus:outline-none focus:ring-2 focus:ring-[#ccfc7e] focus:ring-opacity-50
           transition-all duration-150 active:scale-[0.98] shadow-md hover:shadow-lg flot mt-4"
    >
        Go Home
    </button></a>
    </article>
</div>
<style>
    .page-container {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        /* background-color: #1a1a1a; */
    }

    .not-found-card {
        background-color: #19191c;
        padding: 2.5rem;
        border-radius: 0.75rem;
        text-align: center;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        max-width: 32rem;
        width: 90%;
        margin: 1rem;
        border: 2px solid #2c2c31;
    }

    .card-heading {
        color: #fafafa;
        font-size: 1.875rem;
        margin-bottom: 1rem;
        font-weight: 600;
    }

    .card-text {
        color: #d4d4d8;
        font-size: 1.125rem;
        line-height: 1.6;
        margin: 0;
        opacity: 0.9;
    }
</style>