import React, { useEffect, useRef, useState } from 'react';
import { 
  Calendar, UtensilsCrossed, Film, Waves, Briefcase, Heart, 
  Baby, Target, Gamepad2, BookOpen, Crown, Star
} from 'lucide-react';
import { Button } from '../ui/button';
import { manorData } from '../../data/mock';

const iconMap = {
  Calendar,
  UtensilsCrossed,
  Film,
  Waves,
  Briefcase,
  Heart,
  Baby,
  Target,
  Gamepad2,
  BookOpen
};

const Manor = () => {
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

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="manor" ref={sectionRef} className="section-padding bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #1e3a5f 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 text-[#c9a962] font-medium tracking-wider text-sm uppercase mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Crown className="w-5 h-5" />
            Exclusive Access
          </div>
          <h2 className={`font-display text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {manorData.title}
          </h2>
          <div className={`decorative-line mx-auto mb-6 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
          <p className={`text-[#c9a962] text-xl font-display italic transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {manorData.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`order-2 lg:order-1 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {manorData.description}
            </p>

            {/* Amenities Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {manorData.amenities.map((amenity, index) => {
                const Icon = iconMap[amenity.icon];
                return (
                  <div
                    key={amenity.name}
                    className="group flex items-center gap-3 p-4 bg-[#f8f7f4] rounded-xl hover:bg-[#1e3a5f] transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#c9a962]/20 group-hover:bg-[#c9a962] flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#c9a962] group-hover:text-[#1e3a5f] transition-colors duration-300" />
                    </div>
                    <span className="text-gray-700 group-hover:text-white text-sm font-medium transition-colors duration-300">
                      {amenity.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Membership Card */}
            <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] rounded-2xl p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#c9a962] flex items-center justify-center flex-shrink-0">
                  <Star className="w-7 h-7 text-[#1e3a5f]" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-lg mb-2">VV Membership Passport</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Your membership grants seamless access to a growing portfolio of VV Resorts & Lounges across India.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Button
              onClick={scrollToContact}
              className="mt-6 bg-[#c9a962] hover:bg-[#b8954d] text-[#1e3a5f] font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Learn More About The Manor
            </Button>
          </div>

          {/* Image */}
          <div className={`order-1 lg:order-2 relative transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={manorData.image}
                alt="The Manor Resort Lounge"
                className="w-full h-[550px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/70 via-transparent to-transparent"></div>
              
              {/* Floating Badge */}
              <div className="absolute top-6 right-6">
                <div className="bg-[#c9a962] text-[#1e3a5f] px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg">
                  <Crown className="w-4 h-4" />
                  VV Resorts & Lounges
                </div>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-xl p-4">
                  <p className="text-[#1e3a5f] font-display font-semibold text-lg">The Art of Leisure</p>
                  <p className="text-gray-600 text-sm">An independent entity offering exclusive experiences</p>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-[#c9a962]/30 rounded-tl-2xl"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-[#c9a962]/30 rounded-br-2xl"></div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className={`mt-12 text-center transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-gray-500 text-sm italic">
            *The Manor by VV Resorts and Lounges is an independent entity & not a part of the project amenities. Terms and conditions applicable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Manor;
