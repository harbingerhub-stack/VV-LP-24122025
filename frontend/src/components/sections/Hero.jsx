import React, { useEffect, useState, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { heroData, statsData } from '../../data/mock';

const Counter = ({ value, suffix, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          const duration = 2000;
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-2xl md:text-3xl font-bold text-white">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-white/70 text-xs mt-1 tracking-wider uppercase">{label}</div>
    </div>
  );
};

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const scrollToSection = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-end justify-center px-4 pb-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block px-4 py-2 bg-white/10 border border-white/40 rounded-full text-white text-sm font-medium tracking-wider mb-8">
              {heroData.tagline}
            </span>
          </div>
          
          <h1 className={`font-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-white mb-6 transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {heroData.headline}
          </h1>
          
          <p className={`text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 font-light leading-relaxed transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {heroData.subheadline}
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className={`relative z-10 transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="container-custom py-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 md:p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statsData.map((stat, index) => (
                <Counter key={index} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => scrollToSection('#about')}
          className="text-white/60 hover:text-white transition-colors animate-bounce"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
