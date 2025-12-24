import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Send, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { contactData, plotsData } from '../../data/mock';
import { toast } from 'sonner';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plotType: '',
    message: ''
  });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, plotType: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast.error('Please fill in required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Thank you! Our team will contact you shortly.');
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        plotType: '',
        message: ''
      });
    }, 3000);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent('Hi, I am interested in Vacation Village Chikkamagaluru. Please share more details.');
    window.open(`https://wa.me/${contactData.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-[#084a61] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#87b04a]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`inline-block text-[#87b04a] font-medium tracking-wider text-sm uppercase mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Get In Touch
          </span>
          <h2 className={`font-display text-4xl md:text-5xl font-bold text-white mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {contactData.title}
          </h2>
          <div className={`decorative-line mx-auto mb-6 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
          <p className={`text-gray-300 text-lg transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {contactData.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-[#084a61] mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600">
                    Our team will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="font-display text-2xl font-semibold text-[#084a61] mb-6">
                    Schedule a Site Visit
                  </h3>
                  
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <Label htmlFor="name" className="text-gray-700 mb-2 block">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                          className="border-gray-200 focus:border-[#87b04a] focus:ring-[#87b04a]"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-gray-700 mb-2 block">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 XXXXX XXXXX"
                          className="border-gray-200 focus:border-[#87b04a] focus:ring-[#87b04a]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-gray-700 mb-2 block">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="border-gray-200 focus:border-[#87b04a] focus:ring-[#87b04a]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="plotType" className="text-gray-700 mb-2 block">Interested Plot Size</Label>
                      <Select onValueChange={handleSelectChange} value={formData.plotType}>
                        <SelectTrigger className="border-gray-200 focus:border-[#87b04a] focus:ring-[#87b04a]">
                          <SelectValue placeholder="Select plot size" />
                        </SelectTrigger>
                        <SelectContent>
                          {plotsData.plots.map((plot) => (
                            <SelectItem key={plot.type} value={plot.sqft}>
                              Type {plot.type} - {plot.size} ({plot.sqft})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-gray-700 mb-2 block">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Any specific requirements or questions..."
                        rows={4}
                        className="border-gray-200 focus:border-[#87b04a] focus:ring-[#87b04a] resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#084a61] hover:bg-[#0a5d7a] text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          Submit Enquiry
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="space-y-6">
              {/* WhatsApp CTA */}
              <div className="bg-green-600 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-7 h-7 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">Chat on WhatsApp</h4>
                    <p className="text-green-100 text-sm">Get instant response from our team</p>
                  </div>
                  <Button
                    onClick={openWhatsApp}
                    className="bg-white text-green-600 hover:bg-green-50 font-semibold"
                  >
                    Chat Now
                  </Button>
                </div>
              </div>

              {/* Contact Cards */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="space-y-6">
                  <a
                    href={`tel:${contactData.phone}`}
                    className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#87b04a] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#084a61]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Call Us</p>
                      <p className="text-white font-semibold text-lg group-hover:text-[#87b04a] transition-colors">
                        {contactData.phone}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${contactData.email}`}
                    className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#87b04a] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#084a61]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email Us</p>
                      <p className="text-white font-semibold group-hover:text-[#87b04a] transition-colors">
                        {contactData.email}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-[#87b04a] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#084a61]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Corporate Office</p>
                      <p className="text-white font-medium leading-relaxed">
                        {contactData.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-[#87b04a] rounded-2xl p-6 text-[#084a61]">
                <div className="flex items-center gap-4">
                  <Clock className="w-8 h-8" />
                  <div>
                    <h4 className="font-semibold text-lg">Office Hours</h4>
                    <p className="text-[#084a61]/80">Mon - Sat: 10:00 AM - 7:00 PM</p>
                    <p className="text-[#084a61]/80">Sunday: By Appointment Only</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
