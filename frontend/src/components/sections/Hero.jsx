import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { heroData, statsData } from '../../data/mock';

const AnimatedCounter = ({ value, suffix, label, delay }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.floor(stepValue * currentStep));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [value, isVisible]);

  return (
    <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="font-display text-3xl md:text-4xl font-bold text-white mb-1">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-[#e8d5a3] text-sm font-medium tracking-wide">{label}</div>
    </div>
  );
};

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroData.backgroundImage}
          alt="Vacation Village Chikkamagaluru"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/95 via-[#1e3a5f]/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/80 via-transparent to-[#1e3a5f]/30"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-[#c9a962]/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-40 left-20 w-96 h-96 bg-[#c9a962]/5 rounded-full blur-3xl" style={{ animationDelay: '1s' }}></div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Tagline */}
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-[#e8d5a3] text-sm font-medium tracking-wider border border-[#c9a962]/30">
              <span className="w-2 h-2 rounded-full bg-[#c9a962] animate-pulse"></span>
              {heroData.tagline}
            </span>
          </div>

          {/* Headline */}
          <h1 className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-8 leading-tight transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="block">This View Is Not</span>
            <span className="block text-gradient-gold">Borrowed, It's Yours</span>
          </h1>

          {/* Subheadline */}
          <p className={`text-lg md:text-xl text-gray-300 mt-6 max-w-xl leading-relaxed transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {heroData.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-wrap items-center gap-4 mt-10 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button
              onClick={() => scrollToSection('#contact')}
              className="bg-[#c9a962] hover:bg-[#b8954d] text-[#1e3a5f] font-semibold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              {heroData.ctaText}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-[#1e3a5f] font-semibold px-8 py-6 text-lg transition-all duration-300 group"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Video
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-20 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="glass-dark rounded-2xl p-8 max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {statsData.map((stat, index) => (
                <AnimatedCounter
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  delay={600 + index * 100}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => scrollToSection('#about')}
          className="flex flex-col items-center gap-2 text-white/70 hover:text-[#c9a962] transition-colors group"
        >
          <span className="text-sm tracking-wider">Scroll</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
