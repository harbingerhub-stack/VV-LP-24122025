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
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <span className="text-[#dee3d6] font-medium tracking-wider text-sm uppercase">
              Exclusive Access
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[#084a61] mt-4 mb-6">
              {manorData.title}
            </h2>
            <p className="text-xl text-[#084a61]/60 italic mb-4">{manorData.subtitle}</p>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              {manorData.description}
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {manorData.secondParagraph}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {manorData.amenities.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#dee3d6] flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className={`relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <img
              src={manorData.image}
              alt="The Manor"
              className="rounded-2xl shadow-2xl w-full h-full min-h-[550px] object-cover"
            />
          </div>
        </div>

        {/* Disclaimer */}
        <div className={`mt-10 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-gray-500 text-sm text-left italic">
            Disclaimer: The Manor by VV Resorts and Lounges (a wholly owned subsidiary of the developer) is an independent entity & not a part of the project amenities.<br />
            Terms and conditions applicable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Manor;
