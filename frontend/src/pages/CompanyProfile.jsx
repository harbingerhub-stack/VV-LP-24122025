import React, { useEffect } from 'react';
import { ArrowLeft, Award, Users, TreePine, MapPin, Building2, Target, Eye, Heart, Handshake, Calendar, ChevronRight } from 'lucide-react';

const CompanyProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { number: "13+", label: "Years Since Inception" },
    { number: "1200+", label: "Acres Transacted & Delivered" },
    { number: "1300+", label: "Satisfied Customers" },
    { number: "110000+", label: "Trees Planted" },
    { number: "11", label: "Projects Completed" }
  ];

  const timeline = [
    { year: "2012", title: "Foundation", description: "Founded with expertise in residential & commercial properties. Recognized potential for lucrative land investment in Bengaluru." },
    { year: "2013", title: "First Transaction", description: "Successfully completed first transaction of 49 acres. Built network & knowledge bank through policy research." },
    { year: "2014", title: "Growth", description: "Successfully transacted nearly 300 acres of land in North Bengaluru. Streamlined processes and invested in lands." },
    { year: "2015", title: "Innovation", description: "Introduced 'Managed Farm Communities' - a new category in real estate for organized land investment." },
    { year: "2016", title: "Agrocorp Inception", description: "Founded Agrocorp Landbase Pvt Ltd. Developed Avenue II, first managed farm community." },
    { year: "2017-2019", title: "Expansion", description: "Launched Aranya Farm (2017), Aspya Farms (2018), Amatra Farms, and Amaryllis Farms (2019)." },
    { year: "2020-2021", title: "Diversification", description: "Launched Amari Farms and Landshare - Land Acquisition & Advisory Services with mandates worth ₹4000+ crores." },
    { year: "2022", title: "The Vineyard", description: "Launched globally recognized farm community in Doddaballapur - innovative concept partnered with Grover Zampa." },
    { year: "2023", title: "Vacation Village", description: "Launched premium vacation home development brand. Mission to become India's leading vacation home company." },
    { year: "2024-25", title: "New Horizons", description: "ALPL Logistics Division, Central Vista Farms, and Vacation Village Chikkamagaluru - 41 acres, ₹300 Cr potential." }
  ];

  const groupCompanies = [
    { name: "Agrocorp Landbase (P) Ltd", services: ["Managed Farm Community Development", "Land Development Services"] },
    { name: "Landshare India (P) Ltd", services: ["Transaction Advisory", "Land Acquisition", "Policy Research"] },
    { name: "The Vacation Village", services: ["A-Grade Themed Second Home Projects"] },
    { name: "ALPL Logistics (P) Ltd", services: ["A-Grade Warehousing Facilities"] }
  ];

  const values = [
    { icon: Heart, title: "Emotional & Physical Well-being", description: "Taking the stress out of land investment from inception to delivery." },
    { icon: TreePine, title: "Giving Back", description: "Building self-sustaining communities that give back to the earth." },
    { icon: Building2, title: "Continuous Infrastructure", description: "Communities evolve over time, and we're there to help grow together." },
    { icon: Users, title: "Common Vision", description: "People are the most important ingredient in building a community." },
    { icon: Handshake, title: "Promoting Empathy", description: "Developing deep empathy for all human beings." }
  ];

  const partners = [
    "ARCOP (Architecture Partner)",
    "BAA Bhatnagar & Associates",
    "ANANDAM DESIGNS",
    "BLISS GARDEN & EXTERIOR (Dubai)",
    "Grover Zampa Vineyards",
    "Sila (Facility Management)",
    "NETAFIM™ & Jain Pipes",
    "Rainy (Rainwater Harvesting)"
  ];

  const testimonials = [
    { name: "Mr. Manoj Kumar", text: "Beautiful location and helpful team. I highly recommend Agrocorp." },
    { name: "Mr. Chiranjeev Swamy", text: "The young brigade is prompt and understands our needs perfectly." },
    { name: "Mr. V. Ganeshan", text: "WOW experience! Professional team, good after-sale services, and perfect locations." }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9f6]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-[#084a61] hover:text-[#9B9068] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </a>
          <img 
            src="https://customer-assets.emergentagent.com/job_harmony-estates/artifacts/lksba2p2_VV%20BLUE%20LOGO%20SITE-03.png" 
            alt="Vacation Village" 
            className="h-12 md:h-14 w-auto"
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#084a61] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="text-[#9B9068] font-medium tracking-wider text-sm uppercase mb-4 block">About Us</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">Agrocorp</h1>
          <p className="text-2xl md:text-3xl font-light text-white/80 mb-8">Real Estate. Reimagined.</p>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            A pioneer in managed farm communities and premium vacation home developments, 
            building communities through trust & innovation, one acre at a time.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-display text-4xl md:text-5xl text-[#9B9068] mb-2">{stat.number}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-14 h-14 bg-[#084a61] rounded-full flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h2 className="font-display text-2xl text-[#084a61] mb-6">Our Mission</h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-[#9B9068] flex-shrink-0 mt-0.5" />
                  <span>To curate transparent & hassle-free land investment & acquisition solutions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-[#9B9068] flex-shrink-0 mt-0.5" />
                  <span>To organize & streamline land investment to create promising opportunities for all segments.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-[#9B9068] flex-shrink-0 mt-0.5" />
                  <span>To build communities through trust & innovation, one acre at a time.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-[#9B9068] flex-shrink-0 mt-0.5" />
                  <span>To become India's leading vacation home development and management company.</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-14 h-14 bg-[#9B9068] rounded-full flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h2 className="font-display text-2xl text-[#084a61] mb-6">Our Vision</h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-[#9B9068] flex-shrink-0 mt-0.5" />
                  <span>To change the landscape & experience of buying & selling real estate.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-[#9B9068] flex-shrink-0 mt-0.5" />
                  <span>To cultivate a community spirit across all our developments.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-[#9B9068] flex-shrink-0 mt-0.5" />
                  <span>To develop a vacation village around every major metropolitan city.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-[#9B9068] flex-shrink-0 mt-0.5" />
                  <span>To establish presence in every high tourist footfall city in India.</span>
                </li>
              </ul>
              <div className="mt-8 p-4 bg-[#084a61]/5 rounded-xl">
                <p className="text-[#084a61] font-medium italic">
                  "Land ownership is a fundamental right for all & not just a few."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#9B9068] font-medium tracking-wider text-sm uppercase">Our Story</span>
            <h2 className="font-display text-3xl md:text-4xl text-[#084a61] mt-4">The Journey</h2>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-[#9B9068]/30 hidden md:block"></div>
            
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-[#f8f9f6] p-6 rounded-xl">
                      <span className="text-[#9B9068] font-bold text-lg">{item.year}</span>
                      <h3 className="font-display text-xl text-[#084a61] mt-2 mb-3">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-[#9B9068] rounded-full border-4 border-white shadow-lg z-10 hidden md:block"></div>
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Group Companies */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#9B9068] font-medium tracking-wider text-sm uppercase">Our Ecosystem</span>
            <h2 className="font-display text-3xl md:text-4xl text-[#084a61] mt-4">Group Companies</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {groupCompanies.map((company, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="font-display text-lg text-[#084a61] mb-4">{company.name}</h3>
                <ul className="space-y-2">
                  {company.services.map((service, idx) => (
                    <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-[#9B9068] flex-shrink-0 mt-0.5" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#084a61] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#9B9068] font-medium tracking-wider text-sm uppercase">What Drives Us</span>
            <h2 className="font-display text-3xl md:text-4xl mt-4">Our Culture & Values</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white/10 backdrop-blur p-6 rounded-xl">
                <value.icon className="w-10 h-10 text-[#9B9068] mb-4" />
                <h3 className="font-display text-xl mb-3">{value.title}</h3>
                <p className="text-white/70">{value.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-xl italic text-white/80">
              "We shape our dwellings, and afterwards our dwellings shape us."
            </p>
          </div>
        </div>
      </section>

      {/* Strategic Partners */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#9B9068] font-medium tracking-wider text-sm uppercase">Collaborations</span>
            <h2 className="font-display text-3xl md:text-4xl text-[#084a61] mt-4">Strategic Partners</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {partners.map((partner, index) => (
              <span key={index} className="px-6 py-3 bg-[#f8f9f6] rounded-full text-gray-700 text-sm font-medium">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#9B9068] font-medium tracking-wider text-sm uppercase">What People Say</span>
            <h2 className="font-display text-3xl md:text-4xl text-[#084a61] mt-4">Testimonials</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <p className="text-gray-600 italic mb-6">"{testimonial.text}"</p>
                <p className="font-semibold text-[#084a61]">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Presence */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#9B9068] font-medium tracking-wider text-sm uppercase">Where We Operate</span>
            <h2 className="font-display text-3xl md:text-4xl text-[#084a61] mt-4">Our Presence</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-[#9B9068] mx-auto mb-2" />
              <p className="font-semibold text-[#084a61]">Headquarters</p>
              <p className="text-gray-600">Bengaluru</p>
            </div>
            <div className="text-center">
              <MapPin className="w-8 h-8 text-[#9B9068] mx-auto mb-2" />
              <p className="font-semibold text-[#084a61]">Operations</p>
              <p className="text-gray-600">Delhi NCR, Karnataka, Andhra Pradesh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-[#084a61] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-8">Get In Touch</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-white/80">
              <strong>Corporate Office:</strong><br />
              No. 07, Level 3, VISTA PIXEL, 8/2B and 8/2C, Bellary Road, Jakkuru, Bengaluru, Karnataka 560092
            </p>
            <p className="text-white/80">
              <strong>Phone:</strong> +91-9555 26 1111
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a href="https://www.agrocorp.co.in" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                www.agrocorp.co.in
              </a>
              <a href="https://www.vacationvillage.co.in" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                www.vacationvillage.co.in
              </a>
              <a href="https://www.landshareindia.com" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                www.landshareindia.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <div className="py-10 text-center bg-[#f8f9f6]">
        <a href="/" className="inline-flex items-center gap-2 bg-[#084a61] hover:bg-[#0a5d7a] text-white px-8 py-3 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default CompanyProfile;
