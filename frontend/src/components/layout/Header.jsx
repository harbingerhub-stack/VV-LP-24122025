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
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-6'
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
            className="flex items-center"
          >
            <img 
              src="https://customer-assets.emergentagent.com/job_paradise-plots-3/artifacts/pxhq9e10_VV%20BLUE%20LOGO%20SITE-02.png" 
              alt="Vacation Village Chikkamagaluru" 
              className={`h-12 md:h-14 w-auto transition-all duration-300 ${isScrolled ? '' : 'brightness-0 invert'}`}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`text-sm font-medium tracking-wide transition-all duration-300 hover:text-[#9B9068] ${
                  isScrolled ? 'text-[#084a61]' : 'text-white/90'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href={`tel:${contactData.phone}`}
              className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                isScrolled ? 'text-[#084a61]' : 'text-white'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">{contactData.phone}</span>
            </a>
            <Button
              onClick={() => scrollToSection('#contact')}
              className={`font-medium px-6 transition-all duration-300 ${
                isScrolled 
                  ? 'bg-[#9B9068] hover:bg-[#c5cabe] text-white' 
                  : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
              }`}
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors duration-300 ${
              isScrolled ? 'text-[#084a61]' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-white rounded-2xl p-6 shadow-xl">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-[#084a61] font-medium py-2 hover:text-[#9B9068] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Button
                onClick={() => scrollToSection('#contact')}
                className="mt-4 w-full bg-[#9B9068] hover:bg-[#c5cabe] text-white"
              >
                Get in Touch
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
