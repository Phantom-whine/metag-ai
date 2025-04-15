<script>
    import FeatureHead from "./FeatureHead.svelte";

    let billingPeriod = $state('monthly');
    const tiers = $state([
        {
            name: "Basic",
            monthlyPrice: 29.99,
            generations: 30,
            description: "Perfect for small projects and occasional use.",
            features: [
                { text: "40 generations per month", included: true },
                { text: "Access to basic models", included: true },
                { text: "Email support", included: true },
                { text: "Custom fine-tuning", included: false },
            ],
            buttonText: "Choose Basic",
            buttonVariant: "outline",
        },
        {
            name: "Pro",
            monthlyPrice: 39.99,
            generations: 90,
            description: "Ideal for regular users and growing businesses.",
            features: [
                { text: "120 generations per month", included: true },
                { text: "Access to advanced models", included: true },
                { text: "Priority email support", included: true },
                { text: "Custom fine-tuning", included: false },
            ],
            buttonText: "Choose Pro",
            highlighted: true,
        },
        {
            name: "Plus",
            monthlyPrice: 59.99,
            generations: 200,
            description: "For power users and large-scale applications.",
            features: [
                { text: "300 generations per month", included: true },
                { text: "Access to all models", included: true },
                { text: "24/7 priority support", included: true },
                { text: "Custom fine-tuning", included: true },
            ],
            buttonText: "Choose Enterprise",
            buttonVariant: "outline",
        },
    ]);

    const calculateYearlyDiscount = (monthlyPrice) => {
        const yearlyPrice = monthlyPrice * 12;
        const discountedYearlyPrice = yearlyPrice * 0.8;
        const monthlyEquivalent = discountedYearlyPrice / 12;
        const savingsPercentage = Math.round((1 - monthlyEquivalent / monthlyPrice) * 100);
        return {
            monthlyEquivalent: monthlyEquivalent.toFixed(2),
            savingsPercentage
        };
    };

    const maxSavings = $derived(Math.max(...tiers.map(tier => 
        calculateYearlyDiscount(tier.monthlyPrice).savingsPercentage
    )));
</script>
<div class="h-8"></div>
<FeatureHead title="ONE MORE STEP🤗" description="Back to Business" id='pricing'/>
<div class="h-fit py-8 px-4 text-white">
    <div class="max-w-6xl mx-auto">
        <!-- Period Toggle -->
        <div class="flex justify-center mb-12 gap-2 text-sm flot">
            <button 
                onclick={() => billingPeriod = 'monthly'}
                class="px-4 py-1.5 rounded-full transition-colors"
                class:bg-[#ccfc7e]={billingPeriod === 'monthly'}
                class:text-white={billingPeriod !== 'monthly'}
                class:text-black={billingPeriod == 'monthly'}
            >
                Monthly
            </button>
            <button 
                onclick={() => billingPeriod = 'yearly'}
                class="px-4 py-1.5 rounded-full transition-colors"
                class:bg-[#ccfc7e]={billingPeriod === 'yearly'}
                class:text-white={billingPeriod !== 'yearly'}
                class:text-black={billingPeriod == 'yearly'}
            >
                Yearly
                <span class="ml-1" class:text-black={billingPeriod == 'yearly'} class:text-yellow-400={billingPeriod != 'yearly'}>Save {maxSavings}%</span>
            </button>
        </div>

        <!-- Pricing Grid -->
        <div class="grid md:grid-cols-3 gap-6">
            {#each tiers as tier}
                <div class="rounded-2xl p-6 bg-gradient-to-b from-zinc-900 to-zinc-900/50 relative"
                    class:border={tier.highlighted}
                    class:border-[#ccfc7e]={tier.highlighted}>
                    
                    {#if tier.highlighted}
                        <div class="absolute -top-3 left-1/2 -translate-x-1/2">
                            <span class="bg-[#ccfc7e] text-black flot text-xs rounded-full px-3 py-1 flot">
                                MOST POPULAR
                            </span>
                        </div>
                    {/if}

                    <div class="mb-6">
                        <h3 class="text-sm mb-2">{tier.name}</h3>
                        <div class="flex items-baseline">
                            <span class="text-3xl font-bold transition-all duration-300 flot">
                                ${billingPeriod === 'monthly' 
                                    ? tier.monthlyPrice.toFixed(2)
                                    : calculateYearlyDiscount(tier.monthlyPrice).monthlyEquivalent}
                            </span>
                            <span class="text-zinc-400 ml-1">/mo</span>
                        </div>
                        {#if billingPeriod === 'yearly'}
                            <p class="text-sm text-yellow-400 mt-1">
                                Save {calculateYearlyDiscount(tier.monthlyPrice).savingsPercentage}% with yearly billing
                            </p>
                        {/if}
                        <p class="text-sm text-zinc-400 mt-2">
                            {billingPeriod === 'yearly' ? 'Billed annually' : 'Billed monthly'}
                        </p>
                        <p class="text-sm text-zinc-400 mt-2">{tier.description}</p>
                    </div>

                    <ul class="space-y-3 mb-6">
                        {#each tier.features as feature}
                            <li class="flex items-center text-sm">
                                {#if feature.included}
                                    <span class="text-green-500 mr-2">✓</span>
                                {:else}
                                    <span class="text-zinc-600 mr-2">✗</span>
                                {/if}
                                <span class:line-through={!feature.included} class:text-zinc-500={!feature.included}>
                                    {feature.text}
                                </span>
                            </li>
                        {/each}
                    </ul>

                    <button 
                        class="w-full py-2 px-4 rounded-md transition-colors flot"
                        class:bg-[#ccfc7e]={tier.highlighted}
                        class:hover:[#ccfc7e]={tier.highlighted}
                        class:text-black={tier.highlighted}
                        class:bg-transparent={!tier.highlighted}
                        class:border={!tier.highlighted}
                        class:border-zinc-800={!tier.highlighted}
                        class:hover:bg-zinc-800={!tier.highlighted}
                    >
                        {tier.buttonText}
                    </button>
                </div>
            {/each}
        </div>
    </div>
</div>