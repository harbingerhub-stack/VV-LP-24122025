import React from 'react';
import { Link } from 'react-router-dom';
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
              <a href="https://www.instagram.com/thevacationvillage" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#9B9068] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61556209175651" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#9B9068] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/tvv-official/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#9B9068] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
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
                  className="block text-white/60 hover:text-[#9B9068] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Link
                to="/terms"
                className="block text-white/60 hover:text-[#9B9068] transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/privacy"
                className="block text-white/60 hover:text-[#9B9068] transition-colors"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-6">Contact</h4>
            <div className="space-y-4 text-sm">
              <a href={`tel:${contactData.phone}`} className="flex items-center gap-3 text-white/60 hover:text-[#9B9068] transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" />
                {contactData.phone}
              </a>
              <a href={`mailto:${contactData.email}`} className="flex items-center gap-3 text-white/60 hover:text-[#9B9068] transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                {contactData.email}
              </a>
              <div className="flex items-start gap-3 text-white/60">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{contactData.address}</span>
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
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
