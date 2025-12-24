import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Plane, Hotel, Mountain, Navigation, Car } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { locationData } from '../../data/mock';

const Location = () => {
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
    <section id="location" ref={sectionRef} className="section-padding bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e3a5f' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`inline-block text-[#87b04a] font-medium tracking-wider text-sm uppercase mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Prime Location
          </span>
          <h2 className={`font-display text-4xl md:text-5xl font-bold text-[#084a61] mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {locationData.title}
          </h2>
          <div className={`decorative-line mx-auto mb-6 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
          <p className={`text-gray-600 text-lg transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {locationData.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Map Image */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={locationData.mapImage}
                alt="Chikkamagaluru Location"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#084a61]/60 via-transparent to-transparent"></div>
              
              {/* Location Pin */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#87b04a] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#084a61]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#084a61]">Hebballi, Chikkamagaluru</h4>
                    <p className="text-gray-600 text-sm">Karnataka, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Distance Cards */}
            <div className="absolute -top-4 -right-4 bg-[#084a61] text-white rounded-xl p-4 shadow-xl hidden md:block">
              <div className="flex items-center gap-3">
                <Car className="w-5 h-5 text-[#87b04a]" />
                <div>
                  <p className="font-semibold">230 km</p>
                  <p className="text-xs text-gray-300">from Bengaluru</p>
                </div>
              </div>
            </div>
          </div>

          {/* Distance Tabs */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <Tabs defaultValue="connectivity" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-[#f8f7f4] p-1 rounded-xl">
                <TabsTrigger 
                  value="connectivity" 
                  className="rounded-lg data-[state=active]:bg-[#084a61] data-[state=active]:text-white transition-all"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Connectivity
                </TabsTrigger>
                <TabsTrigger 
                  value="resorts"
                  className="rounded-lg data-[state=active]:bg-[#084a61] data-[state=active]:text-white transition-all"
                >
                  <Hotel className="w-4 h-4 mr-2" />
                  Resorts
                </TabsTrigger>
                <TabsTrigger 
                  value="attractions"
                  className="rounded-lg data-[state=active]:bg-[#084a61] data-[state=active]:text-white transition-all"
                >
                  <Mountain className="w-4 h-4 mr-2" />
                  Attractions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="connectivity" className="mt-0">
                <div className="bg-[#f8f7f4] rounded-2xl p-6">
                  <h4 className="font-display font-semibold text-lg text-[#084a61] mb-4 flex items-center gap-2">
                    <Plane className="w-5 h-5 text-[#87b04a]" />
                    Distance & Connectivity
                  </h4>
                  <div className="space-y-3">
                    {locationData.distances.map((item, index) => (
                      <div
                        key={item.place}
                        className="flex items-center justify-between py-3 border-b border-[#a8ce6d]/30 last:border-0"
                      >
                        <span className="text-gray-700">{item.place}</span>
                        <span className="font-semibold text-[#084a61] bg-white px-3 py-1 rounded-full text-sm">
                          {item.distance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="resorts" className="mt-0">
                <div className="bg-[#f8f7f4] rounded-2xl p-6">
                  <h4 className="font-display font-semibold text-lg text-[#084a61] mb-4 flex items-center gap-2">
                    <Hotel className="w-5 h-5 text-[#87b04a]" />
                    Nearby Premium Resorts
                  </h4>
                  <div className="space-y-3">
                    {locationData.nearbyResorts.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between py-3 border-b border-[#a8ce6d]/30 last:border-0"
                      >
                        <span className="text-gray-700">{item.name}</span>
                        <span className="font-semibold text-[#084a61] bg-white px-3 py-1 rounded-full text-sm">
                          {item.distance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="attractions" className="mt-0">
                <div className="bg-[#f8f7f4] rounded-2xl p-6">
                  <h4 className="font-display font-semibold text-lg text-[#084a61] mb-4 flex items-center gap-2">
                    <Mountain className="w-5 h-5 text-[#87b04a]" />
                    Tourist Attractions
                  </h4>
                  <div className="space-y-3">
                    {locationData.touristSpots.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between py-3 border-b border-[#a8ce6d]/30 last:border-0"
                      >
                        <span className="text-gray-700">{item.name}</span>
                        <span className="font-semibold text-[#084a61] bg-white px-3 py-1 rounded-full text-sm">
                          {item.distance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-[#084a61] rounded-xl p-5 text-white">
                <Plane className="w-6 h-6 text-[#87b04a] mb-3" />
                <p className="font-semibold">Hassan Airport</p>
                <p className="text-sm text-gray-300">Upcoming - 75 km</p>
              </div>
              <div className="bg-[#87b04a] rounded-xl p-5 text-[#084a61]">
                <Navigation className="w-6 h-6 mb-3" />
                <p className="font-semibold">SH 57 Access</p>
                <p className="text-sm opacity-80">Just 0.2 km away</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
