import React, { useEffect, useRef, useState } from 'react';
import { Ruler, Home, Users, Check, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { plotsData } from '../../data/mock';

const Plots = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState(null);
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

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="plots" ref={sectionRef} className="section-padding bg-[#1e3a5f] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#c9a962]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`inline-block text-[#c9a962] font-medium tracking-wider text-sm uppercase mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Plot Options
          </span>
          <h2 className={`font-display text-4xl md:text-5xl font-bold text-white mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {plotsData.title}
          </h2>
          <div className={`decorative-line mx-auto mb-6 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
          <p className={`text-gray-300 text-lg transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {plotsData.description}
          </p>
        </div>

        {/* Plot Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plotsData.plots.map((plot, index) => (
            <div
              key={plot.type}
              onClick={() => setSelectedPlot(selectedPlot === index ? null : index)}
              className={`relative group cursor-pointer transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 transition-all duration-300 ${
                selectedPlot === index 
                  ? 'border-[#c9a962] bg-white/20' 
                  : 'border-transparent hover:border-[#c9a962]/50'
              }`}>
                {/* Type Badge */}
                <div className="absolute -top-3 left-6">
                  <span className="bg-[#c9a962] text-[#1e3a5f] px-4 py-1 rounded-full text-sm font-semibold">
                    Type {plot.type}
                  </span>
                </div>

                <div className="pt-4">
                  {/* Size */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#c9a962]/20 flex items-center justify-center">
                      <Ruler className="w-6 h-6 text-[#c9a962]" />
                    </div>
                    <div>
                      <p className="text-white font-display font-bold text-2xl">{plot.size}</p>
                      <p className="text-gray-400 text-sm">Plot Size</p>
                    </div>
                  </div>

                  {/* Area */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <Home className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg">{plot.sqft}</p>
                      <p className="text-gray-400 text-sm">Total Area</p>
                    </div>
                  </div>

                  {/* Units */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg">{plot.units}</p>
                      <p className="text-gray-400 text-sm">Available</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToContact();
                  }}
                  className="w-full mt-6 bg-transparent border-2 border-[#c9a962] text-[#c9a962] hover:bg-[#c9a962] hover:text-[#1e3a5f] transition-all duration-300"
                >
                  Enquire Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className={`bg-white/5 backdrop-blur-sm rounded-2xl p-8 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-display text-2xl font-semibold text-white mb-6 text-center">
            Neo-Classical Design Standards
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plotsData.features.map((feature, index) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#c9a962] flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-[#1e3a5f]" />
                </div>
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-gray-400 text-sm text-center italic">
              *All construction is governed by a specific design code regarding elevation, sizing, and height to preserve the grandeur and value of the estate.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center mt-12 transition-all duration-700 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Button
            onClick={scrollToContact}
            className="bg-[#c9a962] hover:bg-[#b8954d] text-[#1e3a5f] font-semibold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
          >
            Request Master Plan
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Plots;
