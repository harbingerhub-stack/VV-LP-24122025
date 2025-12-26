import React, { useEffect, useRef, useState } from 'react';
import { amenitiesData } from '../../data/mock';

const Amenities = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="amenities" ref={ref} className="py-24 md:py-32 bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-[#dee3d6] font-medium tracking-wider text-sm uppercase">
            Lifestyle
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[#084a61] mt-4 mb-4">
            {amenitiesData.title}
          </h2>
          <p className="text-gray-600 text-xl">{amenitiesData.subtitle}</p>
        </div>

        {/* Tabs */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {amenitiesData.categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all ${
                activeTab === index
                  ? 'bg-[#084a61] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Amenities Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-5 gap-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {amenitiesData.categories[activeTab].items.map((item, index) => (
            <div
              key={index}
              className="bg-[#f8f9f6] p-6 rounded-2xl text-center hover:bg-[#084a61] hover:text-white transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#dee3d6]/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                <div className="w-3 h-3 rounded-full bg-[#dee3d6]" />
              </div>
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
