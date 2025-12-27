import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9f6]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-[#084a61] hover:text-[#9B9068] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </a>
          <img 
            src="https://customer-assets.emergentagent.com/job_harmony-estates/artifacts/21s3ac58_VV%20BLUE%20LOGO%20SITE-03.png" 
            alt="Vacation Village" 
            className="h-14 w-auto"
          />
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl text-[#084a61] mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-600">
            Last updated: December 2024
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 space-y-8">
          
          {/* Section 1 */}
          <section>
            <h2 className="font-display text-xl text-[#084a61] mb-4">1. Introduction and Acceptance of Terms</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                Welcome to Vacation Village (ALPL 3 LLP) (the "Website"). This Website is owned and operated by Vacation Village (ALPL 3 LLP) ("Vacation Village," "we," "us," or "our"). These Terms and Conditions ("Terms") constitute a legally binding agreement governing your access to and use of the Website, including any content, information, services, and features offered.
              </p>
              <p>
                By accessing, browsing, or using Vacation Village (ALPL 3 LLP) in any manner, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree with any part of these Terms, you must immediately cease all use of the Website.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-display text-xl text-[#084a61] mb-4">2. Description of Services</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                Vacation Village (ALPL 3 LLP) provides a platform for users to access information and services related to real estate and agricultural land investments. Our services include, but are not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Informational Content:</strong> Providing articles, guides, and analysis on topics such as the return on investment (ROI) for farmland, the implications of Goods and Services Tax (GST) on the real estate sector, and trends in property markets, particularly around Bangalore.</li>
                <li><strong>Property Listings:</strong> Showcasing various real estate and farmland properties available for purchase.</li>
                <li><strong>Managed Farmland Services:</strong> Offering professionally managed farmland investment opportunities, where we handle cultivation, maintenance, and marketing of produce on behalf of the landowner.</li>
                <li><strong>Advisory and Consultation:</strong> Providing guidance and consultation to help clients make informed investment decisions in the real estate and agricultural sectors.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-display text-xl text-[#084a61] mb-4">3. User Conduct and Obligations</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                As a condition of your use of Vacation Village (ALPL 3 LLP) you agree not to use the Website for any purpose that is unlawful or prohibited by these Terms. You are expressly prohibited from:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Engaging in any activity that could damage, disable, overburden, or impair the Website or interfere with any other party's use and enjoyment of the Website.</li>
                <li>Attempting to gain unauthorized access to any part of the Website, other accounts, computer systems, or networks connected to the Website through hacking, password mining, or any other means.</li>
                <li>Using any automated means, such as robots, spiders, or scrapers, to access the Website for any purpose without our express written permission.</li>
                <li>Transmitting any viruses, worms, defects, Trojan horses, or any items of a destructive nature.</li>
                <li>Violating any applicable local, state, national, or international law.</li>
                <li>Using the Website to defame, harass, abuse, threaten, or otherwise violate the legal rights of others.</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-display text-xl text-[#084a61] mb-4">4. Investment Disclaimer</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                All information provided on Vacation Village (ALPL 3 LLP) is for informational purposes only and should not be construed as financial, legal, or investment advice. Investing in real estate and farmland involves a significant degree of risk, including the potential for loss of the principal investment.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>No Guarantees:</strong> We do not guarantee any specific investment returns, land appreciation rates, or revenue from farming activities. Past performance is not indicative of future results.</li>
                <li><strong>Due Diligence:</strong> You are solely responsible for conducting your own thorough due diligence and for seeking advice from qualified independent financial, legal, and tax professionals before making any investment decision.</li>
                <li><strong>Forward-Looking Statements:</strong> The Website may contain forward-looking statements that are subject to risks and uncertainties. Actual results may differ materially from those projected in any forward-looking statements.</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-display text-xl text-[#084a61] mb-4">5. Intellectual Property Rights</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                All content on this Website, including but not limited to text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of Vacation Village (ALPL 3 LLP) or its content suppliers and is protected by Indian and international copyright and trademark laws.
              </p>
              <p>
                You are granted a limited, non-exclusive, non-transferable license to access and use the Website and its content for your personal, non-commercial use only. You may not copy, reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Website without our prior written consent.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-display text-xl text-[#084a61] mb-4">6. Limitation of Liability</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                In no event will Vacation Village (ALPL 3 LLP), its affiliates, or their licensors, service providers, employees, agents, officers, or directors be liable for damages of any kind, under any legal theory, arising out of or in connection with your use, or inability to use, Vacation Village (ALPL 3 LLP), any websites linked to it, any content on the Website, or such other websites.
              </p>
              <p>
                This includes any direct, indirect, special, incidental, consequential, or punitive damages, including but not limited to, personal injury, pain and suffering, emotional distress, loss of revenue, loss of profits, loss of business or anticipated savings, loss of use, loss of goodwill, loss of data, and whether caused by tort (including negligence), breach of contract, or otherwise, even if foreseeable.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="font-display text-xl text-[#084a61] mb-4">7. Indemnification</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                You agree to defend, indemnify, and hold harmless Vacation Village (ALPL 3 LLP), its officers, directors, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees) arising from: (i) your use of and access to the Website; (ii) your violation of any term of these Terms; or (iii) your violation of any third-party right, including without limitation any copyright, property, or privacy right.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="font-display text-xl text-[#084a61] mb-4">8. Third-Party Websites and Content</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                The Website may contain links to other websites that are not owned or controlled by Vacation Village (ALPL 3 LLP). We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. By using Vacation Village (ALPL 3 LLP), you expressly relieve Vacation Village (ALPL 3 LLP) from any and all liability arising from your use of any third-party website.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="font-display text-xl text-[#084a61] mb-4">9. Governing Law and Dispute Resolution</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. You agree to submit to the exclusive jurisdiction of the courts located in Bangalore, Karnataka, India, to resolve any legal matter arising from these Terms.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="font-display text-xl text-[#084a61] mb-4">10. Modifications to Terms</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                Vacation Village (ALPL 3 LLP) reserves the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. Your continued use of Vacation Village (ALPL 3 LLP) after any such changes constitutes your acceptance of the new Terms.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="font-display text-xl text-[#084a61] mb-4">11. Shipping Details</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                Transaction details and receipts will be accessible through the applicant's email ID. If required, the same can be sent to the applicant's address upon request. ALPL 3 LLP reserves the right to choose the delivery mode of the said documents.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="font-display text-xl text-[#084a61] mb-4">12. Refund and Cancellation</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                The EOI amount is collected only to register interest and does not constitute a confirmed booking. Cancellation is permitted prior to allotment, and refunds, if applicable, will be processed through the original payment mode. Vacation Village (ALPL 3 LLP) reserves the right to modify this policy at any time.
              </p>
            </div>
          </section>

          {/* Section 13 */}
          <section className="border-t pt-8">
            <h2 className="font-display text-xl text-[#084a61] mb-4">13. Contact Information</h2>
            <div className="text-gray-700 space-y-4">
              <p>For any questions or concerns regarding these Terms, please contact:</p>
              <div className="bg-[#084a61]/5 p-6 rounded-xl">
                <p className="mb-2"><strong>Phone:</strong> (+91) 9540 03 0303</p>
                <p><strong>Company:</strong> Vacation Village (ALPL 3 LLP)</p>
              </div>
            </div>
          </section>

        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-10">
          <a href="/" className="inline-flex items-center gap-2 bg-[#084a61] hover:bg-[#0a5d7a] text-white px-8 py-3 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
