import React from 'react';
import { MapPin, Phone, Mail, Globe, Facebook, Instagram, Linkedin, Youtube, ChevronRight } from 'lucide-react';
import { contactData, navLinks } from '../../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#084a61] text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#87b04a] to-[#a8ce6d] flex items-center justify-center shadow-lg">
                <span className="text-[#084a61] font-display font-bold text-xl">VV</span>
              </div>
              <div>
                <h3 className="font-display font-semibold text-xl">Vacation Village</h3>
                <p className="text-[#87b04a] text-sm tracking-wider">CHIKKAMAGALURU</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              India's Premium Vacation Home Development & Management Company. Crafting worlds defined by breathtaking architecture and seamless convenience.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#87b04a] transition-all duration-300 group"
                >
                  <Icon className="w-5 h-5 text-gray-300 group-hover:text-[#084a61] transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#87b04a]"></span>
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-gray-300 hover:text-[#87b04a] transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight className="w-4 h-4 text-[#87b04a] opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#87b04a]"></span>
              Contact Us
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href={`tel:${contactData.phone}`}
                className="flex items-start gap-3 text-gray-300 hover:text-[#87b04a] transition-colors"
              >
                <Phone className="w-5 h-5 text-[#87b04a] flex-shrink-0 mt-0.5" />
                <span>{contactData.phone}</span>
              </a>
              <a
                href={`mailto:${contactData.email}`}
                className="flex items-start gap-3 text-gray-300 hover:text-[#87b04a] transition-colors"
              >
                <Mail className="w-5 h-5 text-[#87b04a] flex-shrink-0 mt-0.5" />
                <span>{contactData.email}</span>
              </a>
              <a
                href={`https://${contactData.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-gray-300 hover:text-[#87b04a] transition-colors"
              >
                <Globe className="w-5 h-5 text-[#87b04a] flex-shrink-0 mt-0.5" />
                <span>{contactData.website}</span>
              </a>
              <div className="flex items-start gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-[#87b04a] flex-shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">{contactData.address}</span>
              </div>
            </div>
          </div>

          {/* Developer Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#87b04a]"></span>
              Developer
            </h4>
            <div className="bg-white/5 rounded-xl p-5">
              <h5 className="font-semibold text-[#87b04a] mb-2">Agrocorp Landbase (P) Limited</h5>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Established in 2012, Bengaluru. Award-winning real estate developer with 14+ years of excellence.
              </p>
              <div className="flex items-center gap-2 text-sm text-[#87b04a]">
                <span className="font-semibold">Times Real Estate Award</span>
                <span className="text-gray-400">- Iconic Developer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Vacation Village. All rights reserved. A brand of Agrocorp Landbase (P) Limited.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-[#87b04a] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#87b04a] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#87b04a] transition-colors">Disclaimer</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
