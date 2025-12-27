import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Building, FileText, CreditCard, CheckCircle, AlertCircle, Landmark, Globe, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

// Load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Fixed EOI booking amount in paise (₹99,999 = 9999900 paise)
const EOI_AMOUNT = 9999900;

// EOI booking amount (fixed ₹99,999)
const getEOIAmount = (plotType) => {
  return EOI_AMOUNT; // Fixed booking amount
};

const EOIForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eoiData, setEoiData] = useState(null); // Store EOI response after submission
  const [formData, setFormData] = useState({
    // Applicant 1 Details
    applicant1Name: '',
    applicant1Email: '',
    applicant1Mobile: '',
    applicant1Address: '',
    applicant1DOB: '',
    applicant1Occupation: '',
    applicant1Designation: '',
    applicant1Aadhaar: '',
    applicant1PAN: '',
    applicant1GST: '',
    applicant1TAN: '',
    // Applicant 2 Details
    applicant2Name: '',
    applicant2Email: '',
    applicant2Mobile: '',
    applicant2Address: '',
    applicant2DOB: '',
    applicant2Occupation: '',
    applicant2Designation: '',
    applicant2Aadhaar: '',
    applicant2PAN: '',
    applicant2GST: '',
    applicant2TAN: '',
    // Plot Details
    plotType: '',
    plotArea: '',
    eoiAmount: '',
    totalConsideration: '',
    financingType: 'self',
    // Payment Details
    paymentMethod: 'bank',
    paymentDate: '',
    paymentNumber: '',
    bankBranch: '',
    // Terms
    acceptTerms: false,
  });

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePlotSelect = (type, area) => {
    setFormData(prev => ({
      ...prev,
      plotType: type,
      plotArea: area
    }));
  };

  const initiateRazorpayPayment = async (eoiId) => {
    const amount = getEOIAmount(formData.plotType);
    
    if (amount === 0) {
      toast.error('Please select a plot type first');
      return false;
    }

    try {
      // Create order on backend
      const orderResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount,
          eoi_id: eoiId,
          applicant_name: formData.applicant1Name,
          applicant_email: formData.applicant1Email,
          applicant_phone: formData.applicant1Mobile
        })
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create payment order');
      }

      const orderData = await orderResponse.json();

      // Open Razorpay checkout
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Vacation Village',
        description: `EOI Booking - ${formData.plotType} (${formData.plotArea} Sq.ft)`,
        order_id: orderData.order_id,
        handler: async function (response) {
          // Verify payment on backend
          try {
            const verifyResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/payment/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                eoi_id: eoiId
              })
            });

            if (verifyResponse.ok) {
              toast.success('Payment successful! Your EOI has been confirmed.');
              setCurrentStep(5);
            } else {
              toast.error('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: formData.applicant1Name,
          email: formData.applicant1Email,
          contact: formData.applicant1Mobile
        },
        theme: {
          color: '#084a61'
        },
        modal: {
          ondismiss: function() {
            toast.info('Payment cancelled. You can complete payment later.');
            setCurrentStep(5); // Still show success as EOI is submitted
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      return true;

    } catch (error) {
      console.error('Razorpay error:', error);
      toast.error('Failed to initiate payment. Please try again.');
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/eoi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const data = await response.json();
        setEoiData(data);
        
        // If online payment method selected, initiate Razorpay
        if (formData.paymentMethod === 'gateway') {
          toast.success('EOI submitted! Initiating payment...');
          await initiateRazorpayPayment(data.id);
        } else {
          toast.success('Your Expression of Interest has been submitted successfully!');
          setCurrentStep(5); // Success step
        }
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting EOI:', error);
      toast.error('Something went wrong. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  const steps = [
    { number: 1, title: 'Applicant Details', icon: User },
    { number: 2, title: 'Plot Selection', icon: Building },
    { number: 3, title: 'Payment Details', icon: CreditCard },
    { number: 4, title: 'Terms & Signature', icon: FileText },
  ];

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8f9f6]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-[#084a61] hover:text-[#9B9068] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </a>
          <img 
            src="https://customer-assets.emergentagent.com/job_harmony-estates/artifacts/lksba2p2_VV%20BLUE%20LOGO%20SITE-03.png" 
            alt="Vacation Village" 
            className="h-12 md:h-14 w-auto"
          />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Title Section */}
        <div className="text-center mb-10">
          <span className="text-[#9B9068] font-medium tracking-wider text-sm uppercase">
            Vacation Village Chikkamagaluru
          </span>
          <h1 className="font-display text-3xl md:text-4xl text-[#084a61] mt-2 mb-4">
            Expression of Interest
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete this form to express your interest in owning a plot at Vacation Village, Chikkamagaluru.
          </p>
        </div>

        {/* Progress Steps */}
        {currentStep < 5 && (
          <div className="mb-10">
            <div className="flex items-center justify-center gap-2 md:gap-4">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div 
                    className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-all ${
                      currentStep >= step.number 
                        ? 'bg-[#084a61] text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    <step.icon className="w-4 h-4" />
                    <span className="hidden md:inline">{step.title}</span>
                    <span className="md:hidden">{step.number}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 md:w-16 h-0.5 ${currentStep > step.number ? 'bg-[#084a61]' : 'bg-gray-200'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
            
            {/* Step 1: Applicant Details */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl text-[#084a61] mb-6 flex items-center gap-2">
                    <User className="w-6 h-6 text-[#9B9068]" />
                    1st Applicant Details
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input name="applicant1Name" placeholder="Full Name *" value={formData.applicant1Name} onChange={handleChange} className="py-3" required />
                    <Input name="applicant1Email" type="email" placeholder="Email ID *" value={formData.applicant1Email} onChange={handleChange} className="py-3" required />
                    <Input name="applicant1Mobile" placeholder="Mobile Number *" value={formData.applicant1Mobile} onChange={handleChange} className="py-3" required />
                    <Input name="applicant1DOB" type="date" placeholder="Date of Birth" value={formData.applicant1DOB} onChange={handleChange} className="py-3" />
                    <Input name="applicant1Occupation" placeholder="Occupation" value={formData.applicant1Occupation} onChange={handleChange} className="py-3" />
                    <Input name="applicant1Designation" placeholder="Designation" value={formData.applicant1Designation} onChange={handleChange} className="py-3" />
                    <Input name="applicant1Aadhaar" placeholder="Aadhaar Number" value={formData.applicant1Aadhaar} onChange={handleChange} className="py-3" />
                    <Input name="applicant1PAN" placeholder="PAN Number *" value={formData.applicant1PAN} onChange={handleChange} className="py-3" required />
                    <Input name="applicant1GST" placeholder="GST Number (if applicable)" value={formData.applicant1GST} onChange={handleChange} className="py-3" />
                    <Input name="applicant1TAN" placeholder="TAN Number (if applicable)" value={formData.applicant1TAN} onChange={handleChange} className="py-3" />
                  </div>
                  <div className="mt-4">
                    <Textarea name="applicant1Address" placeholder="Official Address *" value={formData.applicant1Address} onChange={handleChange} rows={3} className="resize-none" required />
                  </div>
                </div>

                <div className="border-t pt-8">
                  <h2 className="font-display text-2xl text-[#084a61] mb-6 flex items-center gap-2">
                    <User className="w-6 h-6 text-[#9B9068]" />
                    2nd Applicant Details <span className="text-sm font-normal text-gray-500">(Optional)</span>
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input name="applicant2Name" placeholder="Full Name" value={formData.applicant2Name} onChange={handleChange} className="py-3" />
                    <Input name="applicant2Email" type="email" placeholder="Email ID" value={formData.applicant2Email} onChange={handleChange} className="py-3" />
                    <Input name="applicant2Mobile" placeholder="Mobile Number" value={formData.applicant2Mobile} onChange={handleChange} className="py-3" />
                    <Input name="applicant2DOB" type="date" placeholder="Date of Birth" value={formData.applicant2DOB} onChange={handleChange} className="py-3" />
                    <Input name="applicant2Occupation" placeholder="Occupation" value={formData.applicant2Occupation} onChange={handleChange} className="py-3" />
                    <Input name="applicant2Designation" placeholder="Designation" value={formData.applicant2Designation} onChange={handleChange} className="py-3" />
                    <Input name="applicant2Aadhaar" placeholder="Aadhaar Number" value={formData.applicant2Aadhaar} onChange={handleChange} className="py-3" />
                    <Input name="applicant2PAN" placeholder="PAN Number" value={formData.applicant2PAN} onChange={handleChange} className="py-3" />
                    <Input name="applicant2GST" placeholder="GST Number (if applicable)" value={formData.applicant2GST} onChange={handleChange} className="py-3" />
                    <Input name="applicant2TAN" placeholder="TAN Number (if applicable)" value={formData.applicant2TAN} onChange={handleChange} className="py-3" />
                  </div>
                  <div className="mt-4">
                    <Textarea name="applicant2Address" placeholder="Official Address" value={formData.applicant2Address} onChange={handleChange} rows={3} className="resize-none" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Plot Selection */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl text-[#084a61] mb-2 flex items-center gap-2">
                    <Building className="w-6 h-6 text-[#9B9068]" />
                    Select Your Plot
                  </h2>
                  <p className="text-gray-600 mb-6">Choose from our available plot types</p>

                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    {[
                      { type: 'TYPE A', area: '1200', price: '₹45.99 Lakhs*' },
                      { type: 'TYPE B', area: '1500', price: '₹55.99 Lakhs*' },
                      { type: 'TYPE C', area: '1800', price: '₹65.99 Lakhs*' },
                    ].map((plot) => (
                      <div 
                        key={plot.type}
                        onClick={() => handlePlotSelect(plot.type, plot.area)}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.plotType === plot.type 
                            ? 'border-[#9B9068] bg-[#9B9068]/5' 
                            : 'border-gray-200 hover:border-[#084a61]/30'
                        }`}
                      >
                        <div className="text-center">
                          <h3 className="font-display text-xl text-[#084a61] mb-2">{plot.type}</h3>
                          <p className="text-3xl font-bold text-[#9B9068] mb-1">{plot.area}</p>
                          <p className="text-gray-500 text-sm">Sq. Ft.</p>
                          <p className="text-[#084a61] font-bold text-lg mt-3">{plot.price}</p>
                        </div>
                        {formData.plotType === plot.type && (
                          <div className="mt-4 flex justify-center">
                            <CheckCircle className="w-6 h-6 text-[#9B9068]" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-gray-500 text-sm mb-6">*Terms and Conditions Apply</p>
                </div>

                <div className="border-t pt-8">
                  <h3 className="font-semibold text-[#084a61] mb-4">Financing Details</h3>
                  <div className="flex gap-4">
                    <label className={`flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.financingType === 'self' ? 'border-[#9B9068] bg-[#9B9068]/5' : 'border-gray-200'}`}>
                      <input type="radio" name="financingType" value="self" checked={formData.financingType === 'self'} onChange={handleChange} className="sr-only" />
                      <div className="text-center">
                        <p className="font-medium text-[#084a61]">Self Funding</p>
                      </div>
                    </label>
                    <label className={`flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.financingType === 'loan' ? 'border-[#9B9068] bg-[#9B9068]/5' : 'border-gray-200'}`}>
                      <input type="radio" name="financingType" value="loan" checked={formData.financingType === 'loan'} onChange={handleChange} className="sr-only" />
                      <div className="text-center">
                        <p className="font-medium text-[#084a61]">Bank Loan</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment Details */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl text-[#084a61] mb-2 flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-[#9B9068]" />
                    Payment Details
                  </h2>
                  <p className="text-gray-600 mb-6">Choose your preferred payment method</p>

                  {/* Payment Method Selection */}
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <label 
                      className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.paymentMethod === 'bank' 
                          ? 'border-[#9B9068] bg-[#9B9068]/5' 
                          : 'border-gray-200 hover:border-[#084a61]/30'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="bank" 
                        checked={formData.paymentMethod === 'bank'} 
                        onChange={handleChange} 
                        className="sr-only" 
                      />
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${formData.paymentMethod === 'bank' ? 'bg-[#9B9068]/20' : 'bg-gray-100'}`}>
                          <Landmark className={`w-6 h-6 ${formData.paymentMethod === 'bank' ? 'text-[#9B9068]' : 'text-gray-500'}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#084a61] mb-1">Bank Transfer</h3>
                          <p className="text-gray-500 text-sm">NEFT / RTGS / Cheque / Demand Draft</p>
                        </div>
                        {formData.paymentMethod === 'bank' && (
                          <CheckCircle className="w-5 h-5 text-[#9B9068] absolute top-4 right-4" />
                        )}
                      </div>
                    </label>

                    <label 
                      className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.paymentMethod === 'gateway' 
                          ? 'border-[#9B9068] bg-[#9B9068]/5' 
                          : 'border-gray-200 hover:border-[#084a61]/30'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="gateway" 
                        checked={formData.paymentMethod === 'gateway'} 
                        onChange={handleChange} 
                        className="sr-only" 
                      />
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${formData.paymentMethod === 'gateway' ? 'bg-[#9B9068]/20' : 'bg-gray-100'}`}>
                          <Globe className={`w-6 h-6 ${formData.paymentMethod === 'gateway' ? 'text-[#9B9068]' : 'text-gray-500'}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#084a61] mb-1">Online Payment</h3>
                          <p className="text-gray-500 text-sm">Credit/Debit Card, Net Banking</p>
                        </div>
                        {formData.paymentMethod === 'gateway' && (
                          <CheckCircle className="w-5 h-5 text-[#9B9068] absolute top-4 right-4" />
                        )}
                      </div>
                    </label>
                  </div>

                  {/* Bank Transfer Details */}
                  {formData.paymentMethod === 'bank' && (
                    <>
                      <div className="bg-[#084a61]/5 p-6 rounded-xl mb-6">
                        <h3 className="font-semibold text-[#084a61] mb-3">Bank Account Details</h3>
                        <p className="text-gray-600 text-sm mb-4">Payment to be made in favour of "ALPL 3 LLP COLLECTION AC FOR VACATION VILLAGE"</p>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Account Name</p>
                            <p className="font-medium text-[#084a61]">ALPL 3 LLP Collection A/c for Vacation Village</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Account Number</p>
                            <p className="font-medium text-[#084a61]">3333111145</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Bank & Branch</p>
                            <p className="font-medium text-[#084a61]">Kotak Mahindra Bank, Jakkur Branch, Bengaluru</p>
                          </div>
                          <div>
                            <p className="text-gray-500">IFSC Code</p>
                            <p className="font-medium text-[#084a61]">KKBK0008146</p>
                          </div>
                        </div>
                      </div>

                      <h3 className="font-semibold text-[#084a61] mb-4">Payment Instrument Details</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input name="paymentDate" type="date" placeholder="Payment Date" value={formData.paymentDate} onChange={handleChange} className="py-3" />
                        <Input name="paymentNumber" placeholder="Cheque/RTGS/NEFT Number" value={formData.paymentNumber} onChange={handleChange} className="py-3" />
                        <Input name="bankBranch" placeholder="Your Bank & Branch" value={formData.bankBranch} onChange={handleChange} className="py-3 md:col-span-2" />
                      </div>
                    </>
                  )}

                  {/* Online Payment Gateway */}
                  {formData.paymentMethod === 'gateway' && (
                    <div className="bg-gradient-to-br from-[#084a61]/5 to-[#9B9068]/5 p-8 rounded-xl border border-[#084a61]/10">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-[#084a61] rounded-full flex items-center justify-center mx-auto mb-4">
                          <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-semibold text-[#084a61] text-lg mb-2">Secure Online Payment</h3>
                        <p className="text-gray-600 text-sm">Powered by Razorpay - India's trusted payment gateway</p>
                      </div>

                      {/* Booking Amount Display */}
                      <div className="bg-[#084a61] text-white p-4 rounded-lg mb-4 text-center">
                        <p className="text-sm opacity-80 mb-1">EOI Registration Amount</p>
                        <p className="text-3xl font-bold">₹99,999</p>
                        {formData.plotType && (
                          <p className="text-xs opacity-70 mt-1">For {formData.plotType} - {formData.plotArea} Sq.ft</p>
                        )}
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg mb-4">
                        <h4 className="font-medium text-[#084a61] mb-3 text-sm text-center">Accepted Payment Methods</h4>
                        <div className="flex flex-wrap gap-3 justify-center">
                          <span className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700">Credit Card</span>
                          <span className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700">Debit Card</span>
                          <span className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700">Net Banking</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Shield className="w-4 h-4" />
                        <span>256-bit SSL Encrypted & PCI DSS Compliant</span>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-amber-800">
                        <p className="font-medium mb-1">Important Notes:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>EOI Registration Amount: ₹99,999 (Fixed)</li>
                          <li>Payments accepted only from Applicant's or Co-Applicant's account</li>
                          {formData.paymentMethod === 'bank' && (
                            <li>₹1,000 penalty applicable for cheque dishonour</li>
                          )}
                          {formData.paymentMethod === 'gateway' && (
                            <li>Payment gateway charges, if any, will be borne by the applicant</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Terms & Signature */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl text-[#084a61] mb-2 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-[#9B9068]" />
                    Terms & Conditions
                  </h2>
                  <p className="text-gray-600 mb-6">Please review and accept the terms and conditions</p>

                  <div className="bg-gray-50 p-6 rounded-xl max-h-96 overflow-y-auto text-sm text-gray-700 space-y-4">
                    <div>
                      <h3 className="font-semibold text-[#084a61] mb-2">1. Expression of Interest and Allotment</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>This EOI signifies the Applicant's request for priority consideration for allotment as and when bookings commence.</li>
                        <li>Submission of this EOI does not create any right or claim to any specific plot.</li>
                        <li>The validity of this EOI shall be 180 days from its submission date.</li>
                        <li>The Promoter may reject or return this EOI without assigning any reason.</li>
                        <li>Transfer or assignment of this EOI to a third party is not permitted.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#084a61] mb-2">2. Project Planning and Development</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>The Project is approved by the Assistant Director, Town and Country Planning Department, Chikkamagaluru.</li>
                        <li>The Promoter reserves the right to revise, amend, or modify the project plans.</li>
                        <li>All brochures, images, and renders are purely indicative and for representational purposes only.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#084a61] mb-2">3. Price, Taxes, and Payment Terms</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>The price band and basic unit price of plots are indicative and subject to revision.</li>
                        <li>The Applicant shall bear all applicable statutory and indirect taxes including GST, Stamp Duty, Registration Charges.</li>
                        <li>Any change in taxation rates after the date of EOI shall be borne by the Applicant.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#084a61] mb-2">4. Payment Schedule and Default</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>The Applicant must adhere strictly to the payment timelines specified.</li>
                        <li>Delay in payments shall attract an interest penalty.</li>
                        <li>The Company reserves the right to cancel the allotment for non-compliance or default.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#084a61] mb-2">5. Plot Area and Possession</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>The plot area indicated is approximate and subject to final measurement at the time of possession.</li>
                        <li>The final price will be calculated based on the actual area.</li>
                        <li>Plot boundaries will be marked by the Promoter.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#084a61] mb-2">6. Construction and Development Guidelines</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>Any future construction must comply with the Company's approved designs and development guidelines.</li>
                        <li>The Applicant shall not deviate from the prescribed guidelines.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#084a61] mb-2">7. Maintenance Charges</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>Initial maintenance charge: ₹5 per sq. ft. per month plus applicable GST.</li>
                        <li>2-year advance towards maintenance and one-year equivalent towards Corpus Deposit required.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#084a61] mb-2">8. Registration and Legal Matters</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>Registration costs and incidental expenses shall be borne by the Applicant.</li>
                        <li>The Company shall not be liable for changes in laws or government policies.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#084a61] mb-2">9. General and Legal Provisions</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>This document records an Expression of Interest and does not constitute a binding contract.</li>
                        <li>Jurisdiction: Bengaluru, Karnataka.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#084a61] mb-2">10. Cancellation and Refund</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>The EOI amount is collected only to register interest and does not constitute a confirmed booking.</li>
                        <li>Cancellation is permitted prior to allotment, and refunds, if applicable, will be processed through the original payment mode.</li>
                        <li>Agrocorp reserves the right to modify this policy at any time.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#084a61] mb-2">11. Shipping Details</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>Transaction details and receipts will be accessible through the applicant's email ID.</li>
                        <li>If required, the same can be sent to the applicant's address upon request.</li>
                        <li>ALPL 3 LLP reserves the right to choose the delivery mode of the said documents.</li>
                      </ul>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-gray-600">
                        <strong>Contact for queries:</strong><br />
                        Email: enquiries@vacationvillage.co.in<br />
                        Phone: +91 9555 26 1111
                      </p>
                    </div>
                  </div>
                </div>

                {/* Single Signature Section */}
                <div className="border-t pt-8">
                  <h3 className="font-semibold text-[#084a61] mb-4">Digital Signature & Consent</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">1st Applicant Signature</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
                        <p className="text-gray-500 text-sm">Type your full name as digital signature</p>
                        <Input 
                          placeholder="Type your full name" 
                          className="mt-3 text-center font-display text-lg" 
                          value={formData.applicant1Name}
                          readOnly
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">2nd Applicant Signature <span className="text-gray-400 font-normal">(if applicable)</span></label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
                        <p className="text-gray-500 text-sm">Type your full name as digital signature</p>
                        <Input 
                          placeholder="Type your full name" 
                          className="mt-3 text-center font-display text-lg" 
                          value={formData.applicant2Name || ''}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="acceptTerms" 
                      checked={formData.acceptTerms} 
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 rounded border-gray-300 text-[#9B9068] focus:ring-[#9B9068]"
                    />
                    <span className="text-sm text-gray-600">
                      I/We hereby confirm that I/we have read, understood, and agree to the above Terms and Conditions. 
                      I/We understand that this Expression of Interest does not constitute a binding understanding/allotment 
                      and is subject to acceptance by the Promoter. I/We authorize the Promoter to present and encash any 
                      cheque/demand draft enclosed along with this EOI.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 5: Success */}
            {currentStep === 5 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-[#9B9068]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-[#9B9068]" />
                </div>
                <h2 className="font-display text-3xl text-[#084a61] mb-4">Thank You!</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Your Expression of Interest has been submitted successfully. Our team will contact you shortly with the next steps.
                </p>
                <div className="bg-gray-50 p-6 rounded-xl max-w-md mx-auto mb-8">
                  <p className="text-sm text-gray-600">
                    <strong>Note:</strong> This EOI is just an Expression of Interest and does not create any right on the plot or against the Promoter. 
                    Allotment of plot will be done at the sole discretion of the Promoter.
                  </p>
                </div>
                <a href="/">
                  <Button className="bg-[#084a61] hover:bg-[#0a5d7a] text-white px-8 py-3">
                    Back to Home
                  </Button>
                </a>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 5 && (
              <div className="flex justify-between mt-10 pt-6 border-t">
                {currentStep > 1 ? (
                  <Button type="button" onClick={prevStep} variant="outline" className="px-6">
                    Previous
                  </Button>
                ) : (
                  <div />
                )}
                
                {currentStep < 4 ? (
                  <Button type="button" onClick={nextStep} className="bg-[#084a61] hover:bg-[#0a5d7a] text-white px-8">
                    Continue
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !formData.acceptTerms}
                    className="bg-[#9B9068] hover:bg-[#7a7352] text-white px-8"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit EOI'}
                  </Button>
                )}
              </div>
            )}
          </div>
        </form>

        {/* Footer Info */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            <strong>To:</strong> M/s ALPL 3 LLP, Unit 7, 3rd Floor, Vista Pixel, Bellary Road, Jakkuru, Bengaluru, Karnataka: 560 092
          </p>
          <p className="mt-2">
            Project Site: Sy. Nos. 29/5, 29/6, 29/7, 29/11, 29/17, 31, 32/2, 45 and 46 of Hebbali Village, Kasaba Hobli, Chikkamagaluru, Karnataka.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EOIForm;
