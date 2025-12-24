import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Building2, Gem, Settings, Leaf, TrendingUp } from 'lucide-react';
import { aboutData } from '../../data/mock';

const iconMap = {
  MapPin,
  Building2,
  Gem,
  Settings,
  Leaf,
  TrendingUp
};

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-[#f8f7f4] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a962]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1e3a5f]/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`inline-block text-[#c9a962] font-medium tracking-wider text-sm uppercase mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Welcome to Vacation Village
          </span>
          <h2 className={`font-display text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {aboutData.title}
          </h2>
          <div className={`decorative-line mx-auto mb-6 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
          <p className={`text-gray-600 text-lg leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {aboutData.description}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={aboutData.image}
                alt="Luxury Villa"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/40 to-transparent"></div>
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-6 shadow-xl max-w-xs hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#c9a962]/10 flex items-center justify-center">
                  <Gem className="w-7 h-7 text-[#c9a962]" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-[#1e3a5f]">Premium Living</h4>
                  <p className="text-gray-500 text-sm">Luxury Leisure Lifestyle</p>
                </div>
              </div>
            </div>
            {/* Decorative Frame */}
            <div className="absolute -top-4 -left-4 w-32 h-32 border-2 border-[#c9a962]/30 rounded-tl-2xl"></div>
          </div>

          {/* Content */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-[#1e3a5f] mb-6">
              {aboutData.subtitle}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-8">
              {aboutData.vision}
            </p>

            {/* Developer Info */}
            <div className="bg-[#1e3a5f] rounded-xl p-6 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#c9a962] flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[#1e3a5f]" />
                </div>
                <div>
                  <h4 className="font-semibold">Agrocorp Landbase (P) Limited</h4>
                  <p className="text-[#c9a962] text-sm">Established 2012, Bengaluru</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Award-winning developer recognized by Times Real Estate Awards as "Iconic Real Estate Developer" with a commitment to sustainable efficiency and social wellbeing.
              </p>
            </div>
          </div>
        </div>

        {/* Pillars Section */}
        <div>
          <h3 className={`font-display text-2xl md:text-3xl font-semibold text-[#1e3a5f] text-center mb-12 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Our Unwavering Commitment
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutData.pillars.map((pillar, index) => {
              const Icon = iconMap[pillar.icon];
              return (
                <div
                  key={pillar.title}
                  className={`group bg-white rounded-xl p-6 shadow-md card-hover border border-transparent hover:border-[#c9a962]/30 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-[#f8f7f4] group-hover:bg-[#c9a962]/10 flex items-center justify-center mb-4 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-[#c9a962]" />
                  </div>
                  <h4 className="font-display font-semibold text-lg text-[#1e3a5f] mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
