import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { navLinks, contactData } from '../../data/mock';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#084a61] to-[#0a5d7a] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <span className="text-[#87b04a] font-display font-bold text-lg">VV</span>
            </div>
            <div className="hidden sm:block">
              <h1 className={`font-display font-semibold text-lg leading-tight transition-colors duration-300 ${
                isScrolled ? 'text-[#084a61]' : 'text-white'
              }`}>
                Vacation Village
              </h1>
              <p className={`text-xs tracking-wider transition-colors duration-300 ${
                isScrolled ? 'text-[#87b04a]' : 'text-[#a8ce6d]'
              }`}>
                CHIKKAMAGALURU
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`text-sm font-medium tracking-wide transition-all duration-300 hover:text-[#87b04a] relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-[#87b04a] after:transition-all after:duration-300 hover:after:w-full ${
                  isScrolled ? 'text-[#084a61]' : 'text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${contactData.phone}`}
              className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                isScrolled ? 'text-[#084a61]' : 'text-white'
              }`}
            >
              <Phone className="w-4 h-4 text-[#87b04a]" />
              {contactData.phone}
            </a>
            <Button
              onClick={() => scrollToSection('#contact')}
              className="bg-[#87b04a] hover:bg-[#6f9a3a] text-[#084a61] font-semibold px-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              Enquire Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled ? 'text-[#084a61]' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="glass rounded-2xl p-6 shadow-xl">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-[#084a61] font-medium py-2 border-b border-[#a8ce6d]/30 hover:text-[#87b04a] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`tel:${contactData.phone}`}
                className="flex items-center justify-center gap-2 text-[#084a61] font-medium"
              >
                <Phone className="w-4 h-4 text-[#87b04a]" />
                {contactData.phone}
              </a>
              <Button
                onClick={() => scrollToSection('#contact')}
                className="w-full bg-[#87b04a] hover:bg-[#6f9a3a] text-[#084a61] font-semibold"
              >
                Enquire Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
