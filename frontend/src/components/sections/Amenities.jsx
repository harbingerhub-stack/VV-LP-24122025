import React, { useEffect, useRef, useState } from 'react';
import { 
  Route, Zap, Droplets, Recycle, Shield, Lightbulb, BatteryCharging,
  TreePine, Footprints, Trophy, CircleDot, Target, Gamepad2, Baby,
  Heart, Dumbbell, Flame, Coffee, Flower2
} from 'lucide-react';
import { amenitiesData } from '../../data/mock';

const iconMap = {
  "12 Metre Paver Roads with Pedestrian Walkway": Route,
  "Underground Electricity Infrastructure": Zap,
  "Underground Water Infrastructure": Droplets,
  "Sewage System with Treatment Plant": Recycle,
  "Rain Water Harvesting": Droplets,
  "CCTV Surveillance": Shield,
  "Entrance Gate with Security Cabins": Shield,
  "Street Lights": Lightbulb,
  "EV Charging Station": BatteryCharging,
  "Parks & Recreation Zones": TreePine,
  "Walking Tracks": Footprints,
  "Tennis Court": Trophy,
  "Basketball Court": CircleDot,
  "Padel Court": Target,
  "Mini Golf": Target,
  "Kids Play Area": Baby,
  "Yoga and Meditation Deck": Heart,
  "Open Air Gym": Dumbbell,
  "Barbeque Area": Flame,
  "Bonfire Pit": Flame,
  "Kitchen and Herb Garden": Coffee,
  "Themed Landscape": Flower2
};

const Amenities = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
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
    <section id="amenities" ref={sectionRef} className="section-padding bg-[#f8f7f4] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a962]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1e3a5f]/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`inline-block text-[#c9a962] font-medium tracking-wider text-sm uppercase mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Premium Amenities
          </span>
          <h2 className={`font-display text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {amenitiesData.title}
          </h2>
          <div className={`decorative-line mx-auto mb-6 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
          <p className={`text-gray-600 text-lg transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {amenitiesData.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={amenitiesData.image}
                alt="Premium Amenities"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/60 via-transparent to-transparent"></div>
              
              {/* Overlay Stats */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-xl p-5">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="font-display text-2xl font-bold text-[#1e3a5f]">20+</p>
                      <p className="text-gray-600 text-sm">Amenities</p>
                    </div>
                    <div className="border-x border-[#e8d5a3]">
                      <p className="font-display text-2xl font-bold text-[#1e3a5f]">24/7</p>
                      <p className="text-gray-600 text-sm">Security</p>
                    </div>
                    <div>
                      <p className="font-display text-2xl font-bold text-[#1e3a5f]">Eco</p>
                      <p className="text-gray-600 text-sm">Friendly</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Frame */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-[#c9a962]/30 rounded-br-2xl"></div>
          </div>

          {/* Amenities List */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-3 mb-8">
              {amenitiesData.categories.map((category, index) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(index)}
                  className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                    activeCategory === index
                      ? 'bg-[#1e3a5f] text-white shadow-lg'
                      : 'bg-white text-[#1e3a5f] hover:bg-[#1e3a5f]/10'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="grid sm:grid-cols-2 gap-4">
                {amenitiesData.categories[activeCategory].items.map((item, index) => {
                  const Icon = iconMap[item] || Shield;
                  return (
                    <div
                      key={item}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f8f7f4] transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#c9a962]/10 group-hover:bg-[#c9a962]/20 flex items-center justify-center flex-shrink-0 transition-colors">
                        <Icon className="w-5 h-5 text-[#c9a962]" />
                      </div>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Highlight */}
            <div className="mt-6 bg-[#1e3a5f] rounded-xl p-5 text-white">
              <p className="text-sm leading-relaxed">
                <span className="text-[#c9a962] font-semibold">Sustainable Living:</span> Our community features rainwater harvesting, sewage treatment plants, EV charging stations, and themed landscapes - blending eco-friendly practices with premium living.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Amenities;
