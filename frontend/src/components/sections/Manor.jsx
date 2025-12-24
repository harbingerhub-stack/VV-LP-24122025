import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { manorData } from '../../data/mock';

const Manor = () => {
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

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#f8f9f6]">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <span className="text-[#87b04a] font-medium tracking-wider text-sm uppercase">
              Exclusive Access
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[#084a61] mt-4 mb-6">
              {manorData.title}
            </h2>
            <p className="text-xl text-[#084a61]/60 italic mb-4">{manorData.subtitle}</p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {manorData.description}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {manorData.amenities.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#87b04a] flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className={`relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative">
              <div className="absolute -inset-4 bg-[#084a61]/10 rounded-3xl transform -rotate-3" />
              <img
                src={manorData.image}
                alt="The Manor"
                className="relative rounded-2xl shadow-2xl w-full h-[450px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Manor;
