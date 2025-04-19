<script>
    import Footer from "$lib/components/shared/Footer.svelte";
</script>
<svelte:head>
    <title>Privacy Policy</title>
</svelte:head>
<header class="header bg-zinc-800 flex justify-between">
    <a href="javascript:history.back()" class="back-button flot bg-[#ccfc7e]">Back</a>
    <img src="./logo.png" class="logo-img" alt="Company Logo" />
</header>

<div class="main-container">
    <h1 class="flot-b" style="font-size: 27px;">Refund Policy</h1>

    <p class="border border-black rounded-md p-2 flot bg-black text-white" style="margin-top: 10px; margin-bottom: 10px;">Last updated: April 19, 2025</p>
    <p>Thank you for subscribing to Metag, an AI-powered LinkedIn post generator. Please read our Refund Policy carefully before making a purchase.</p>

  <h2 class="flot">1. No Refunds</h2>
  <p>All payments made to Metag are <strong>final, non-refundable, and non-transferable</strong>. By subscribing to our service, you acknowledge and agree that:</p>
  <ul>
    <li>We do not offer any refunds under any circumstances.</li>
    <li>Once a subscription payment is made, it cannot be canceled or refunded.</li>
    <li>There are no exceptions to this policy, including accidental purchases or dissatisfaction with the service.</li>
  </ul>

  <h2 class="flot">2. No Free Trials</h2>
  <p>Metag does not offer free trials. All users must commit to a paid subscription to access the platform and its features.</p>

  <h2 class="flot">3. No One-Time Payments</h2>
  <p>Metag operates solely on a subscription-based model. We do not offer any one-time payment plans or lifetime deals. All access to the service is tied to an active recurring subscription.</p>

  <h2 class="flot">4. Subscription Cancellations</h2>
  <p>You may cancel your subscription at any time through your account settings. When you cancel, your access will remain active until the end of your current billing cycle. No partial refunds will be issued for unused time.</p>

  <h2 class="flot">5. Chargebacks</h2>
  <p>Filing a chargeback without first contacting our support team is considered a violation of our terms. We reserve the right to dispute chargebacks and provide evidence of service usage. Accounts associated with chargebacks will be terminated immediately.</p>

  <h2 class="flot">6. Contact Us</h2>
  <p>If you have any questions regarding this Refund Policy, you may contact us at <a href="mailto:support@metag.ai">support@metag.ai</a>.</p>

</div>
<Footer />
<style>
    .header {
        padding: 18px 24px;
        display: flex;
        align-items: center;
        gap: 20px;
        position: fixed;
        width: 100%;
        top: 0;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .back-button {
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        font-size: 15px;
        transition: all 0.2s ease;
        padding: 5px;
    }

    .back-button:hover {
        background-color: #f8f9fa;
        transform: scale(1.05);
    }

    .logo-img {
        height: 32px;
        width: auto;
        object-fit: contain;
    }

    .main-container {
        max-width: 800px;
        margin: 100px auto 40px;
        padding: 40px;
        background: #ffffff;
        border-radius: 16px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .content-heading {
        color: #1a1a1a;
        font-size: 32px;
        margin-bottom: 32px;
        padding-bottom: 16px;
        border-bottom: 2px solid #f0f0f0;
    }

    .section-heading {
        color: #2c3e50;
        font-size: 20px;
        margin: 24px 0 12px;
    }

    .section-text {
        color: #666666;
        font-size: 15px;
        line-height: 1.7;
        margin-bottom: 20px;
    }
</style>
