import React, { useEffect, useRef, useState } from 'react';
import { Car, MapPin, Hotel, Flag, Mountain, Coffee, Waves, TreePine } from 'lucide-react';
import { locationData } from '../../data/mock';

const iconMap = { Car, MapPin, Hotel, Flag };

const Location = () => {
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

  const attractionIcons = [Mountain, Waves, Mountain, Coffee];

  return (
    <section id="location" ref={ref} className="py-24 md:py-32 bg-[#f8f9f6]">
      <div className="container-custom">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-[#87b04a] font-medium tracking-wider text-sm uppercase">
            Prime Location
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[#084a61] mt-4 mb-4">
            {locationData.title}
          </h2>
          <p className="text-[#084a61]/60 text-xl">{locationData.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map/Image */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-full">
              <img
                src={locationData.mapImage}
                alt="Chikkamagaluru"
                className="w-full h-full min-h-[550px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#084a61]/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-display text-3xl text-white mb-2">Hebballi</h3>
                <p className="text-white/80">Your address in the hills</p>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {locationData.description}
            </p>

            {/* Distance Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {locationData.highlights.map((item, index) => {
                const Icon = iconMap[item.icon];
                return (
                  <div key={index} className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <Icon className="w-6 h-6 text-[#87b04a] mb-3" />
                    <div className="font-display text-2xl text-[#084a61]">{item.value}</div>
                    <div className="text-gray-500 text-sm">{item.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Attractions */}
            <div className="bg-[#084a61] p-6 rounded-2xl">
              <h4 className="text-white font-semibold mb-4">Nearby Attractions</h4>
              <div className="grid grid-cols-2 gap-3">
                {locationData.attractions.map((item, index) => {
                  const Icon = attractionIcons[index];
                  return (
                    <div key={index} className="flex items-center gap-3 text-white/80">
                      <Icon className="w-4 h-4 text-[#87b04a]" />
                      <span className="text-sm">{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
