import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { aboutData } from '../../data/mock';

const About = () => {
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
    <section id="about" ref={ref} className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative">
              <img
                src={aboutData.image}
                alt="Luxury Villa"
                className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-[#084a61] text-white p-6 rounded-2xl shadow-xl hidden md:block">
              <div className="font-display text-4xl font-bold">260</div>
              <div className="text-white/80 text-sm">Premium Villa Plots</div>
            </div>
          </div>

          {/* Content Side */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <span className="text-[#dee3d6] font-medium tracking-wider text-sm uppercase">
              Welcome to Vacation Village
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-[#084a61] mt-4 mb-6">
              {aboutData.title}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {aboutData.description}
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6">
              {aboutData.features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#dee3d6]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-[#dee3d6]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#084a61] mb-1">{feature.title}</h4>
                    <p className="text-gray-500 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
