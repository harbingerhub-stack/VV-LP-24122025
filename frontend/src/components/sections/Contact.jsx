import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { contactData } from '../../data/mock';
import { toast } from 'sonner';

const Contact = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error('Please fill required fields');
      return;
    }
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        toast.success('Thank you! We will contact you soon.');
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${contactData.whatsapp}?text=${encodeURIComponent('Hi, I am interested in Vacation Village Chikkamagaluru.')}`, '_blank');
  };

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 bg-[#084a61]">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <span className="text-[#9B9068] font-medium tracking-wider text-sm uppercase">
              Get in Touch
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white mt-4 mb-6">
              {contactData.title}
            </h2>
            <p className="text-white/70 text-lg mb-10">{contactData.subtitle}</p>

            <div className="space-y-6 mb-10">
              <a href={`tel:${contactData.phone}`} className="flex items-center gap-4 text-white hover:text-[#9B9068] transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white/60 text-sm">Call us</div>
                  <div className="text-lg font-semibold">{contactData.phone}</div>
                </div>
              </a>
              <a href={`mailto:${contactData.email}`} className="flex items-center gap-4 text-white hover:text-[#9B9068] transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white/60 text-sm">Email us</div>
                  <div className="text-lg font-semibold">{contactData.email}</div>
                </div>
              </a>
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white/60 text-sm">Location</div>
                  <div className="text-lg font-semibold">{contactData.address}</div>
                </div>
              </div>
            </div>
            
            {/* Company Profile Link */}
            <a 
              href="/about-us" 
              className="inline-flex items-center gap-2 text-[#9B9068] hover:text-white transition-colors text-sm font-medium"
            >
              <span>Click here to know more about the company</span>
              <span>→</span>
            </a>
          </div>

          {/* Form Side */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
              <h3 className="font-display text-2xl text-[#084a61] mb-6">Request a Call Back</h3>
              
              <div className="space-y-5">
                <div>
                  <Input
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="border-gray-200 py-6 rounded-xl"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="border-gray-200 py-6 rounded-xl"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="border-gray-200 py-6 rounded-xl"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    className="border-gray-200 rounded-xl resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#084a61] hover:bg-[#0a5d7a] text-white py-6 text-lg rounded-xl"
                >
                  {isSubmitting ? 'Sending...' : (<><Send className="w-5 h-5 mr-2" />Send Enquiry</>)}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
