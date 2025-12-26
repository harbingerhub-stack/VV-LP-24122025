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
    <section id="location" ref={ref} className="py-20 md:py-24 bg-[#f8f9f6]">
      <div className="container-custom">
        {/* Header */}
        <div className={`text-center max-w-4xl mx-auto mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-[#9B9068] font-medium tracking-wider text-sm uppercase">
            Prime Location
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#084a61] mt-4 mb-4">
            {locationData.title}
          </h2>
          <p className="text-[#084a61]/70 text-lg md:text-xl italic">{locationData.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Image */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-full min-h-[500px]">
              <img
                src={locationData.mapImage}
                alt="Chikkamagaluru"
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#084a61]/90 via-[#084a61]/20 to-transparent" />
              
              {/* Shot at Site Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 text-[#084a61] text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                  Shot at site
                </span>
              </div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                {/* Distance Cards - Compact */}
                <div className="grid grid-cols-2 gap-4">
                  {locationData.highlights.map((item, index) => {
                    const Icon = iconMap[item.icon];
                    return (
                      <div key={index} className="bg-white/15 backdrop-blur-sm p-3 rounded-lg text-center">
                        <Icon className="w-4 h-4 text-[#9B9068] mx-auto mb-1" />
                        <div className="font-bold text-white text-sm">{item.value}</div>
                        <div className="text-white/70 text-[10px] leading-tight">{item.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg h-full flex flex-col">
              <p className="text-gray-600 leading-relaxed mb-6">
                {locationData.description}
              </p>

              {/* Why Choose Section */}
              <div className="mb-6 flex-1">
                <h3 className="font-display text-xl text-[#084a61] mb-4">Why Choose Vacation Village Chikkamagaluru?</h3>
                <div className="space-y-3">
                  {locationData.whyChoose.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#9B9068] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold text-[#084a61]">{item.title}:</span>
                        <span className="text-gray-600 ml-1">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Closing Text */}
              <div className="border-l-3 border-[#9B9068] pl-4 bg-[#9B9068]/5 py-3 rounded-r-lg mb-4">
                <p className="text-gray-700 text-sm leading-relaxed italic">
                  {locationData.closingText}
                </p>
              </div>

              {/* Nearby Attractions - Compact */}
              <div className="bg-[#084a61] p-4 rounded-xl">
                <h4 className="text-white font-semibold mb-2 text-sm">Nearby Attractions</h4>
                <div className="flex flex-wrap gap-2">
                  {locationData.attractions.map((item, index) => {
                    const Icon = attractionIcons[index];
                    return (
                      <div key={index} className="flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded-full">
                        <Icon className="w-3 h-3 text-[#9B9068]" />
                        <span className="text-white/90 text-xs">{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
