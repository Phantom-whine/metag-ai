<script>
    import Banner from "$lib/components/shared/banner.svelte";
    import Hero from "$lib/components/shared/Hero.svelte";
    import Navbar from "$lib/components/shared/navbar.svelte";
    import FeatureRepr from "$lib/components/shared/FeatureRepr.svelte";
    import FeatureLink from "$lib/components/shared/FeatureLink.svelte";
    import FeatureBlog from "$lib/components/shared/FeatureBlog.svelte";
    import Benefits from "$lib/components/shared/Benefits.svelte";
    import Testimonial from "$lib/components/shared/testimonial.svelte";
    import Pricing from "$lib/components/shared/Pricing.svelte";
    import Footer from "$lib/components/shared/Footer.svelte";
    import Faq from "$lib/components/shared/FAQ.svelte";

    let { data } = $props();
    let isLoggedIn = !!data.username;
</script>

<svelte:head>
    <title>Metag AI - Grow On Linkedin</title>
    <meta name="description" content="Struggling with LinkedIn content? Get scroll-stopping post ideas, write like a pro, and build your personal brand using your unique voice—all with our LinkedIn Post Generator.">
</svelte:head>

<Banner text='Get started with your Free credits'/>

<Navbar isLoggedIn/>
<Hero isLoggedIn/>
<FeatureRepr />
<FeatureLink />
<FeatureBlog />
<Benefits />
<div class="flex items-center justify-center mt-20 p-4">
    <div class="bg-[#ccfc7e] p-8 rounded-lg shadow-lg max-w-5xl">
        <p class="text-black text-4xl font-bold leading-tight text-center flot-b">
            Struggling to get <span class="bg-black p-1 rounded-md text-white">NOTICED?</span> But with the right spark, your content can go viral. Unsure what to say? Metag AI helps you craft posts that connect and messages that stick.
             </p>
    </div>
</div>
<Testimonial />
<Pricing />
<Faq />
<Footer />
