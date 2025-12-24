import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Grid3X3, Map } from 'lucide-react';
import { Button } from '../ui/button';
import { plotsData } from '../../data/mock';

const Plots = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('plots');
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
        <div className={`text-center max-w-3xl mx-auto mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-[#87b04a] font-medium tracking-wider text-sm uppercase">
            Plot Options
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-white mt-4 mb-4">
            {plotsData.title}
          </h2>
          <p className="text-white/70 text-xl">{plotsData.subtitle}</p>
        </div>

        {/* Tab Menu */}
        <div className={`flex justify-center mb-10 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-1.5 inline-flex">
            <button
              onClick={() => setActiveTab('plots')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                activeTab === 'plots'
                  ? 'bg-[#87b04a] text-white shadow-lg'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
              Available Plot Sizes
            </button>
            <button
              onClick={() => setActiveTab('siteplan')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                activeTab === 'siteplan'
                  ? 'bg-[#87b04a] text-white shadow-lg'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Map className="w-4 h-4" />
              Site Plan
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'plots' ? (
          <>
            {/* Plot Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {plotsData.plots.map((plot, index) => (
                <div
                  key={index}
                  className={`bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-[#87b04a]/50 transition-all duration-500 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
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
          </>
        ) : (
          /* Site Plan Tab */
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl max-w-5xl mx-auto">
              <div className="relative">
                <iframe
                  src="https://docs.google.com/viewer?url=https://customer-assets.emergentagent.com/job_vv-hill-retreat/artifacts/lopwtct0_master%20plan.pdf&embedded=true"
                  className="w-full h-[500px] md:h-[600px] rounded-lg border-0"
                  title="Site Plan"
                />
              </div>
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-gray-600 text-sm">
                  View the complete master plan with plot layouts, roads, and amenities
                </p>
                <a
                  href="https://customer-assets.emergentagent.com/job_vv-hill-retreat/artifacts/lopwtct0_master%20plan.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#084a61] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#0a5d7a] transition-colors"
                >
                  <Map className="w-4 h-4" />
                  Download Full Plan
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Plots;
