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
    <h1 class="flot-b" style="font-size: 27px;">Privacy Policy</h1>

    <p class="border border-black rounded-md p-2 flot bg-black text-white" style="margin-top: 10px; margin-bottom: 10px;">Last updated: April 19, 2025</p>
    <p>This Privacy Policy describes how Metag ("we", "our", or "us") collects, uses, shares, and protects personal information when you use our website, applications, and services ("Services").</p>

    <h2 class="flot-b" style="font-size: 20px; margin-bottom: 10px;">1. Information We Collect</h2>
  
    <h3 class="flot">1.1 Information You Provide</h3>
    <ul>
      <li>Account Information: Name, email address, and password when you register.</li>
      <li>Content Input: Prompts or text you submit for AI processing.</li>
      <li>Payment Details: When subscribing to a paid plan, payment information is processed securely by our third-party payment provider (e.g., Stripe).</li>
    </ul>
  
    <h3 class="flot">1.2 Automatically Collected Information</h3>
    <ul>
      <li>Device and Usage Data: IP address, browser type, device type, pages visited, time spent, and other diagnostic data.</li>
      <li>Cookies and Tracking: We use cookies to improve your experience. You can control cookie settings in your browser.</li>
    </ul>
  
    <h2 class="flot">2. How We Use Your Information</h2>
    <ul>
      <li>To provide and maintain our Services.</li>
      <li>To personalize your experience and improve performance.</li>
      <li>To communicate with you about updates, changes, or support inquiries.</li>
      <li>To analyze trends and usage statistics.</li>
      <li>To comply with legal obligations and prevent fraud or abuse.</li>
    </ul>
  
    <h2 class="flot">3. Sharing of Information</h2>
    <ul>
      <li>Service Providers: We may share your information with third-party vendors who help us provide and maintain our Services.</li>
      <li>Legal Compliance: We may disclose your information if required by law or to protect our rights.</li>
      <li>Business Transfers: In case of a merger or acquisition, your information may be transferred as part of the deal.</li>
    </ul>
  
    <h2 class="flot">4. Third-Party Services</h2>
    <p>We use third-party tools such as Google Analytics, Stripe, and OpenAI/Claude APIs. These services may collect information in accordance with their own privacy policies.</p>
  
    <h2 class="flot">5. Data Retention</h2>
    <p>We retain your personal information for as long as necessary to provide our Services and comply with legal obligations. You may request deletion of your account and data at any time.</p>
  
    <h2 class="flot">6. Your Rights</h2>
    <p>Depending on your location, you may have the following rights:</p>
    <ul>
      <li>Access your personal data.</li>
      <li>Request correction or deletion of your data.</li>
      <li>Withdraw consent for data processing (if applicable).</li>
      <li>File a complaint with a data protection authority.</li>
    </ul>
  
    <h2 class="flot">7. Security</h2>
    <p>We use industry-standard security measures to protect your data. However, no method of transmission or storage is 100% secure. Use Metag at your own risk.</p>
  
    <h2 class="flot">8. Children’s Privacy</h2>
    <p>Metag is not intended for use by individuals under the age of 13. We do not knowingly collect personal data from children under 13. If we discover such data has been collected, we will delete it promptly.</p>
  
    <h2 class="flot">9. International Data Transfers</h2>
    <p>If you are accessing Metag from outside the country where our servers are located, your information may be transferred across borders and stored in different jurisdictions.</p>
  
    <h2 class="flot">10. Changes to This Privacy Policy</h2>
    <p>We may update this Privacy Policy periodically. If we make material changes, we will notify you via email or through the platform. Continued use of the Service constitutes your agreement to the updated policy.</p>
  
    <h2 class="flot">11. Contact Us</h2>
    <p>If you have any questions about this Privacy Policy or your data, please contact us at <a href="mailto:ophantomo990@gmail.com">ophantomo990@gmail.com</a>.</p>
    
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
