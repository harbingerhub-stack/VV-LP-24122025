import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { navLinks, contactData } from '../../data/mock';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (link) => {
    setIsMobileMenuOpen(false);
    if (link.isPage) {
      navigate(link.href);
    } else {
      const element = document.querySelector(link.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToSection = (href) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg py-3">
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
              window.scrollTo(0, 0);
            }}
            className="flex items-center"
          >
            <img 
              src="https://customer-assets.emergentagent.com/job_harmony-estates/artifacts/21s3ac58_VV%20BLUE%20LOGO%20SITE-03.png" 
              alt="Vacation Village Chikkamagaluru" 
              className="h-12 md:h-14 w-auto"
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
                  handleNavClick(link);
                }}
                className="text-lg font-medium tracking-wide text-[#084a61] transition-all duration-300 hover:text-[#9B9068]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href={`tel:${contactData.phone}`}
              className="flex items-center gap-2 text-sm text-[#084a61]"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">{contactData.phone}</span>
            </a>
            <Button
              onClick={() => scrollToSection('#contact')}
              className="font-medium px-6 bg-[#9B9068] hover:bg-[#7a7352] text-white"
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#084a61]"
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
                    handleNavClick(link);
                  }}
                  className="text-[#084a61] font-medium py-2 hover:text-[#9B9068] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Button
                onClick={() => scrollToSection('#contact')}
                className="mt-4 w-full bg-[#9B9068] hover:bg-[#7a7352] text-white"
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
