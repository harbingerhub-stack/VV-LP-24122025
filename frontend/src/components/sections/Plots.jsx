import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { plotsData } from '../../data/mock';

const Plots = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="plots" ref={ref} className="py-24 md:py-32 bg-[#084a61]">
      <div className="container-custom">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-[#87b04a] font-medium tracking-wider text-sm uppercase">
            Plot Options
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-white mt-4 mb-4">
            {plotsData.title}
          </h2>
          <p className="text-white/70 text-xl">{plotsData.subtitle}</p>
        </div>

        {/* Plot Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plotsData.plots.map((plot, index) => (
            <div
              key={index}
              className={`bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-[#87b04a]/50 transition-all duration-500 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {plot.price === 'Popular' && (
                <div className="bg-[#87b04a] text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  Most Popular
                </div>
              )}
              <div className="font-display text-4xl text-white mb-2">{plot.size}</div>
              <div className="text-[#87b04a] text-2xl font-semibold mb-6">{plot.sqft} Sq.ft</div>
              
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-white/70">
                  <span>Available Units</span>
                  <span className="text-white font-semibold">{plot.units}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Category</span>
                  <span className="text-white font-semibold">{plot.price}</span>
                </div>
              </div>

              <Button
                onClick={scrollToContact}
                className="w-full bg-transparent border-2 border-white/30 text-white hover:bg-[#87b04a] hover:border-[#87b04a] transition-all group-hover:border-[#87b04a]"
              >
                Enquire Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className={`text-center text-white/60 text-sm transition-all duration-700 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {plotsData.note}
        </p>
      </div>
    </section>
  );
};

export default Plots;
