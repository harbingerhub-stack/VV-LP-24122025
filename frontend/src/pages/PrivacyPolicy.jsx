import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
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
            src="https://customer-assets.emergentagent.com/job_harmony-estates/artifacts/lksba2p2_VV%20BLUE%20LOGO%20SITE-03.png" 
            alt="Vacation Village" 
            className="h-16 md:h-20 w-auto"
          />
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl text-[#084a61] mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            Last updated: December 2024
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 space-y-8">
          
          {/* Introduction */}
          <section>
            <p className="text-gray-700 leading-relaxed">
              Vacation Village (ALPL 3 LLP) is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className="font-display text-xl text-[#084a61] mb-4">1. Information We Collect</h2>
            <div className="text-gray-700 space-y-4">
              <p>We may collect the following types of personal information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Online Identifiers:</strong> IP address, device information, and browser type.</li>
                <li><strong>Location Information:</strong> Geographic location data.</li>
                <li><strong>Usage Data:</strong> Information about how you use our services, such as pages visited and actions taken.</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-display text-xl text-[#084a61] mb-4">2. How We Use Your Information</h2>
            <div className="text-gray-700 space-y-4">
              <p>We may use your personal information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Providing Services:</strong> To provide real estate services, including property listings, sales, and rentals.</li>
                <li><strong>Customer Support:</strong> To respond to your inquiries and provide customer support.</li>
                <li><strong>Marketing and Communications:</strong> To send you marketing materials, newsletters, and other communications.</li>
                <li><strong>Improving Our Services:</strong> To analyze usage data and improve our services.</li>
                <li><strong>Compliance with Legal Obligations:</strong> To comply with applicable laws and regulations.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-display text-xl text-[#084a61] mb-4">3. Sharing Your Information</h2>
            <div className="text-gray-700 space-y-4">
              <p>We may share your personal information with:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Service Providers:</strong> Third-party service providers who assist us in providing our services.</li>
                <li><strong>Legal Authorities:</strong> To comply with legal obligations or government requests.</li>
              </ul>
              <p className="mt-4">
                When you voluntarily send us electronic mail / fill up the form, we will keep a record of this information so that we can respond to you. We only collect information from you when you register on our site or fill out a form. Also, when filling out a form on our site, you may be asked to enter your: name, e-mail address or phone number. You may, however, visit our site anonymously.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
                <p className="text-amber-800 text-sm">
                  <strong>Important:</strong> In case you have submitted your personal information and contact details, we reserve the rights to Call, SMS, Email or WhatsApp about our products and offers, even if your number has DND activated on it.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-display text-xl text-[#084a61] mb-4">4. Data Security</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                We implement reasonable security measures to protect your personal information from unauthorized access, use, disclosure, alteration, or destruction. However, please note that no security system is completely impenetrable.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-display text-xl text-[#084a61] mb-4">5. Cookies and Tracking Technologies</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                We use cookies and similar tracking technologies to collect information about your usage of our website. This information helps us improve our website and your user experience.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-display text-xl text-[#084a61] mb-4">6. Your Rights</h2>
            <div className="text-gray-700 space-y-4">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal information.</li>
                <li>Correct any inaccuracies in your personal information.</li>
                <li>Request the deletion of your personal information.</li>
                <li>Object to the processing of your personal information.</li>
                <li>Restrict the processing of your personal information.</li>
                <li>Data portability.</li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="font-display text-xl text-[#084a61] mb-4">7. Changes to This Privacy Policy</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any significant changes.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="border-t pt-8">
            <h2 className="font-display text-xl text-[#084a61] mb-4">8. Contact Us</h2>
            <div className="text-gray-700 space-y-4">
              <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
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

export default PrivacyPolicy;
