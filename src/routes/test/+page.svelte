<script>
    // Configuration
    // Replace with values from your sandbox account
    const CONFIG = {
      clientToken: "test_321cee6c4e07080cdbbbae4b29a",
      prices: {
        starter: {
          month: "pri_01jn0wt8yah44ym8rnsqsyxmrg",
          year: "pri_01jn0wt8yah44ym8rnsqsyxmrg"
        },
        pro: {
          month: "pri_01jn13f2azzm3swbbfg887vd7j",
          year: "pri_01jn0wt8yah44ym8rnsqsyxmrg"
        }
      }
    };
  
    // State
    let currentBillingCycle = $state("month");
    let currentCountry = $state("US");
    let paddleInitialized = $state(false);
    let starterPriceDisplay = $state("$10.00");
    let proPriceDisplay = $state("$30.00");
  
    // Initialize Paddle when component mounts
    $effect(() => {
      initializePaddle();
    });
  
    // Re-run price update when dependencies change
    $effect(() => {
      if (paddleInitialized) {
        updatePrices();
      }
    });
  
    // Initialize Paddle
    function initializePaddle() {
      try {
        // This assumes Paddle is loaded globally via a script tag
        window.Paddle.Environment.set("sandbox");
        window.Paddle.Initialize({
          token: CONFIG.clientToken,
          eventCallback: function (event) {
            console.log("Paddle event:", event);
          }
        });
        paddleInitialized = true;
      } catch (error) {
        console.error("Initialization error:", error);
      }
    }
  
    // Update billing cycle
    function updateBillingCycle(cycle) {
      currentBillingCycle = cycle;
    }
  
    // Update prices
    async function updatePrices() {
      if (!paddleInitialized) {
        console.log("Paddle not initialized yet");
        return;
      }
  
      try {
        const request = {
          items: [
            {
              quantity: 1,
              priceId: CONFIG.prices.starter[currentBillingCycle]
            },
            {
              quantity: 1,
              priceId: CONFIG.prices.pro[currentBillingCycle]
            }
          ],
          address: {
            countryCode: currentCountry
          },
        };
  
        console.log("Fetching prices:", request);
        const result = await window.Paddle.PricePreview(request);
        
        result.data.details.lineItems.forEach((item) => {
          const price = item.formattedTotals.subtotal;
          if (item.price.id === CONFIG.prices.starter[currentBillingCycle]) {
            starterPriceDisplay = price;
          } else if (item.price.id === CONFIG.prices.pro[currentBillingCycle]) {
            proPriceDisplay = price;
          }
        });
        
        console.log("Prices updated:", result);
      } catch (error) {
        console.error(`Error fetching prices: ${error.message}`);
      }
    }
  
    // Open checkout
    function openCheckout(plan) {
      if (!paddleInitialized) {
        console.log("Paddle not initialized yet");
        return;
      }
      
      try {
        window.Paddle.Checkout.open({
          items: [
            {
              priceId: CONFIG.prices[plan][currentBillingCycle],
              quantity: 1
            }
          ],
          settings: {
            theme: "dark",
            displayMode: "overlay",
            variant: "one-page"
          }
        });
      } catch (error) {
        console.error(`Checkout error: ${error.message}`);
      }
    }
  
    // Handle country change
    function onCountryChange(e) {
      currentCountry = e.target.value;
    }
  </script>
  <svelte:head>
    <script src="https://cdn.paddle.com/paddle/v2/paddle.js"></script>
  </svelte:head>
  <!-- Pricing Container -->
  <div class="max-w-6xl mx-auto px-4 py-8">
    <!-- Billing Toggle -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center bg-gray-100 rounded-lg p-1">
        <button 
          class="px-4 py-2 rounded-md text-sm {currentBillingCycle === 'month' ? 'bg-white' : ''}" 
          onclick={() => updateBillingCycle('month')}
        >
          Monthly
        </button>
        <button 
          class="px-4 py-2 rounded-md text-sm {currentBillingCycle === 'year' ? 'bg-white' : ''}" 
          onclick={() => updateBillingCycle('year')}
        >
          Yearly (Save 20%)
        </button>
      </div>
    </div>
  
    <!-- Pricing Grid -->
    <div class="grid md:grid-cols-3 gap-8">
      <!-- Starter Plan -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h3 class="text-xl font-semibold mb-4">Starter</h3>
        <div class="mb-4">
          <span class="text-4xl font-bold">{starterPriceDisplay}</span>
          <span class="text-gray-500 ml-1">/{currentBillingCycle}</span>
        </div>
        <button 
          onclick={() => openCheckout('starter')} 
          class="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors"
        >
          Get started
        </button>
      </div>
  
      <!-- Pro Plan -->
      <div class="bg-white rounded-lg shadow-lg p-8 border-2 border-blue-500 relative">
        <div class="absolute -top-3 right-12 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Popular</div>
        <h3 class="text-xl font-semibold mb-4">Pro</h3>
        <div class="mb-4">
          <span class="text-4xl font-bold">{proPriceDisplay}</span>
          <span class="text-gray-500 ml-1">/{currentBillingCycle}</span>
        </div>
        <button 
          onclick={() => openCheckout('pro')} 
          class="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors"
        >
          Get started
        </button>
      </div>
  
      <!-- Enterprise Plan -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h3 class="text-xl font-semibold mb-4">Enterprise</h3>
        <div class="mb-4">
          <span class="text-4xl font-bold">Contact us</span>
        </div>
        <button 
          onclick={() => window.location.href='mailto:sales@example.com'} 
          class="w-full bg-gray-600 text-white rounded-lg px-4 py-2 hover:bg-gray-700 transition-colors"
        >
          Let's talk
        </button>
      </div>
    </div>
  
  
  </div>