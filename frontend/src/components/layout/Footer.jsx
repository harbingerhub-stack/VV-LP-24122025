import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';
import { contactData, navLinks } from '../../data/mock';

const Footer = () => {
  const scrollToSection = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#052f3d] text-white">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <img 
                src="https://customer-assets.emergentagent.com/job_paradise-plots-3/artifacts/9m721w20_VV_Logo_white_runalto-02.png" 
                alt="Vacation Village" 
                className="h-24 w-auto"
              />
            </div>
            <p className="text-white/60 leading-relaxed mb-6 max-w-md">
              India's premium vacation home development. Crafting extraordinary worlds defined by breathtaking architecture and seamless convenience.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#87b04a] transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6">Quick Links</h4>
            <nav className="space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className="block text-white/60 hover:text-[#87b04a] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-6">Contact</h4>
            <div className="space-y-4">
              <a href={`tel:${contactData.phone}`} className="flex items-center gap-3 text-white/60 hover:text-[#87b04a] transition-colors">
                <Phone className="w-4 h-4" />
                {contactData.phone}
              </a>
              <a href={`mailto:${contactData.email}`} className="flex items-center gap-3 text-white/60 hover:text-[#87b04a] transition-colors">
                <Mail className="w-4 h-4" />
                {contactData.email}
              </a>
              <div className="flex items-start gap-3 text-white/60">
                <MapPin className="w-4 h-4 mt-1" />
                {contactData.address}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Vacation Village. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
