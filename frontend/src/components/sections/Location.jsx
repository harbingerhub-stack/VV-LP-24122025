import React, { useEffect, useRef, useState } from 'react';
import { Car, MapPin, Hotel, Flag, Mountain, Coffee, Waves, TreePine, Check } from 'lucide-react';
import { locationData } from '../../data/mock';

const iconMap = { Car, MapPin, Hotel, Flag };

const Location = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const attractionIcons = [Mountain, Waves, Mountain, Coffee];

  return (
    <section id="location" ref={ref} className="py-20 md:py-28 bg-[#f8f9f6]">
      <div className="container-custom">
        {/* Header */}
        <div className={`text-center max-w-4xl mx-auto mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-[#87b04a] font-medium tracking-wider text-sm uppercase">
            Prime Location
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#084a61] mt-4 mb-4">
            {locationData.title}
          </h2>
          <p className="text-[#084a61]/70 text-lg md:text-xl italic">{locationData.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          {/* Left Side - Image & Cards */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {/* Map/Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-6">
              <img
                src={locationData.mapImage}
                alt="Chikkamagaluru"
                className="w-full h-[280px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#084a61]/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-2xl text-white mb-1">Hebballi</h3>
                <p className="text-white/80 text-sm">Your address in the hills</p>
              </div>
            </div>

            {/* Distance Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {locationData.highlights.map((item, index) => {
                const Icon = iconMap[item.icon];
                return (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <Icon className="w-5 h-5 text-[#87b04a] mb-2" />
                    <div className="font-display text-xl text-[#084a61]">{item.value}</div>
                    <div className="text-gray-500 text-xs">{item.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Attractions */}
            <div className="bg-[#084a61] p-5 rounded-xl">
              <h4 className="text-white font-semibold mb-3 text-sm">Nearby Attractions</h4>
              <div className="grid grid-cols-2 gap-2">
                {locationData.attractions.map((item, index) => {
                  const Icon = attractionIcons[index];
                  return (
                    <div key={index} className="flex items-center gap-2 text-white/80">
                      <Icon className="w-3 h-3 text-[#87b04a]" />
                      <span className="text-xs">{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              {locationData.description}
            </p>

            {/* Why Choose Section */}
            <div className="mb-6">
              <h3 className="font-display text-xl text-[#084a61] mb-4">Why Choose Vacation Village?</h3>
              <div className="space-y-3">
                {locationData.whyChoose.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#87b04a] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-[#084a61]">{item.title}:</span>
                      <span className="text-gray-600 ml-1">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Closing Text */}
            <div className="bg-[#084a61]/5 border-l-4 border-[#87b04a] p-5 rounded-r-xl">
              <p className="text-gray-700 leading-relaxed italic">
                {locationData.closingText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
