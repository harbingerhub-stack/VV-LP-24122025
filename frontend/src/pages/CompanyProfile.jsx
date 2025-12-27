import React, { useEffect } from 'react';
import { ArrowLeft, Users, TreePine, MapPin, Building2, Target, Eye, Heart, Handshake, ChevronRight } from 'lucide-react';

const CompanyProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const groupCompanies = [
    { 
      name: "Agrocorp Landbase (P) Ltd", 
      services: ["Development of Themed Second Home Farm Communities", "Land Development & Management"] 
    },
    { 
      name: "Landshare India (P) Ltd", 
      services: ["Transaction Advisory", "Land Acquisition", "Policy Research"] 
    },
    { 
      name: "Vacation Village", 
      services: ["Premium Second Home Development & Management Brand", "A-Grade Themed Second Home Communities"] 
    },
    { 
      name: "ALPL Logistics (P) Ltd", 
      services: ["A-Grade Warehousing Facilities"] 
    }
  ];

  const stats = [
    { number: "14+", label: "Years Since Inception" },
    { number: "1200+", label: "Acres Transacted & Delivered" },
    { number: "2000+", label: "Satisfied Customers" },
    { number: "150,000+", label: "Trees Planted" },
    { number: "11", label: "Projects Completed" }
  ];

  const missionPoints = [
    { title: "Setting the Gold Standard", description: "To be recognized as India's leading name in second-home living, offering unparalleled development and expert management." },
    { title: "Building Beyond Structures", description: "To cultivate vibrant, trust-based communities where innovation and connection are at the heart of every Project." },
    { title: "Architectural Excellence", description: "To craft stunning retreats that blend world-class design with robust, future-ready infrastructure." },
    { title: "Elevating the Holiday Experience", description: "To provide a worry-free ecosystem where security and convenience meet, allowing you to enjoy your getaway exactly as it was meant to be." }
  ];

  const visionPoints = [
    { title: "Revolutionizing the Journey", description: "To transform the real estate experience into a transparent, seamless, and rewarding journey for every buyer and seller." },
    { title: "Inspiring Belonging", description: "To cultivate a vibrant spirit of community and connection that breathes life into every development we create." },
    { title: "Escapes Within Reach", description: "To establish a sanctuary of \"vacation villages\" within reach of every major metropolitan hub, making luxury getaways a part of daily life." },
    { title: "A National Footprint", description: "To become the heartbeat of Indian leisure by establishing a presence in every premier tourist destination across the country." }
  ];

  const timeline = [
    { year: "2012", title: "The Foundation", description: "Strategic Vision: Established with deep expertise in residential and commercial sectors, identifying North Bengaluru as the next frontier for land investment." },
    { year: "2013", title: "Establishing Trust", description: "First Milestone: Successfully closed a 49-acre landmark transaction. Knowledge Bank: Invested heavily in policy research to simplify the complexities of land acquisition for our clients." },
    { year: "2014", title: "Market Leadership", description: "Scaling Operations: Transacted nearly 300 acres of prime land, building a reputation for transparency and efficiency in every deal." },
    { year: "2015", title: "The \"Managed Farm\" Revolution", description: "A New Category: Introduced 'Managed Farm Communities'—a pioneering concept designed to give investors a secure, organized, and hands-off way to own productive land." },
    { year: "2016", title: "The Agrocorp Era", description: "Brand Inception: Founded Agrocorp Landbase Pvt. Ltd. with a singular focus: making land investment near Bengaluru seamless and secure. Flagship Launch: Debuted Avenue 11, setting the benchmark for professionally managed farm communities." },
    { year: "2017–2019", title: "Proven Growth", description: "Building Communities: Rapidly expanded the Agrocorp portfolio with the launch of Aranya, Aspya, Amatra, and Amaryllis Farms, creating a new standard for weekend retreats." },
    { year: "2020–2021", title: "Expertise at Scale", description: "Advisory Excellence: Launched Landshare, an advisory division managing land mandates worth ₹4,000+ Crores, proving our mastery in land acquisition." },
    { year: "2022", title: "Redefining Luxury", description: "Global Recognition: Launched The Vineyard in Doddaballapur—a world-class collaboration with Grover Zampa and India Sotheby's International Realty, blending investment with lifestyle." },
    { year: "2023", title: "From Investment to Experience", description: "Vacation Village: Launched our premium brand dedicated to high-end second homes. The New Mission: Transitioning from being leaders in land investment to becoming India's premier Vacation Home Company." },
    { year: "2024–2025", title: "New Horizons", description: "Strategic Expansion: Acquired 31 acres in Chikkamagaluru for our flagship Vacation Village project and 28 acres for Central Vista Farms, a tropical-themed retreat on NH 44. Industrial Growth: Diversified into Grade-A warehousing with the launch of the ALPL Logistics Division near the Bengaluru-Vijayawada Expressway." }
  ];

  const values = [
    { icon: Heart, title: "Emotional & Physical Well-being", description: "Taking the stress out of land investment from inception to delivery." },
    { icon: TreePine, title: "Giving Back", description: "Building self-sustaining communities that give back to the earth." },
    { icon: Building2, title: "Continuous Infrastructure", description: "Communities evolve over time, and we're there to help grow together." },
    { icon: Users, title: "Common Vision", description: "People are the most important ingredient in building a community." },
    { icon: Handshake, title: "Promoting Empathy", description: "Developing deep empathy for all human beings." },
    { icon: null, title: null, description: "We shape our dwellings, and afterwards our dwellings shape us.", isQuote: true }
  ];

  const testimonials = [
    { name: "Mr. Manoj Kumar", text: "Beautiful location and helpful team. I highly recommend Agrocorp." },
    { name: "Mr. Chiranjeev Swamy", text: "The young brigade is prompt and understands our needs perfectly." },
    { name: "Mr. V. Ganeshan", text: "WOW experience! Professional team, good after-sale services, and perfect locations." }
  ];

  const mediaItems = [
    { 
      image: "https://customer-assets.emergentagent.com/job_harmony-estates/artifacts/0xysc8ox_Artboard%201.jpg"
    },
    { 
      image: "https://customer-assets.emergentagent.com/job_harmony-estates/artifacts/li7ozstc_Artboard%202.jpg"
    },
    { 
      image: "https://customer-assets.emergentagent.com/job_harmony-estates/artifacts/a7wgxqtp_Artboard%204.jpg"
    }
  ];

  const leadership = [
    {
      name: "Arush Nagpal",
      title: "Director",
      quote: "People forget that they are at the core of any true real estate transaction. We value people & they value the transaction process.",
      image: "https://customer-assets.emergentagent.com/job_harmony-estates/artifacts/ghovtwlg_Arush.jpg",
      linkedin: "https://www.linkedin.com/in/arush-nagpal-2b347795/"
    },
    {
      name: "Ayan Nagpal",
      title: "Director",
      quote: "Land is limited & is the core of all realty developments. The idea is to make the journey of all stakeholders organised, transparent & seamless.",
      image: "https://customer-assets.emergentagent.com/job_harmony-estates/artifacts/833sdw4a_Ayan.jpg",
      linkedin: "https://www.linkedin.com/in/ayan-nagpal-7b36b4116/"
    },
    {
      name: "Shailesh Kumar",
      title: "Vice President: Transaction Advisory",
      quote: "Shared vision, integrity and transparency is the bedrock of my decade long relationship with global and domestic financial institutions, private equity funds and real estate developers",
      image: "https://customer-assets.emergentagent.com/job_harmony-estates/artifacts/1j2qnufj_Shailesh.png",
      linkedin: "https://www.linkedin.com/in/shailesh-kumar-a8a2672a5/"
    },
    {
      name: "Saummay Sinha",
      title: "Associate Vice President: Sales",
      quote: "One should not only persevere to complete the sales cycle but to make the process effective and sustainable",
      image: "https://customer-assets.emergentagent.com/job_harmony-estates/artifacts/vwovc0mv_Saummay.png",
      linkedin: "https://www.linkedin.com/in/saummay-sinha-007a79b5/"
    },
    {
      name: "Sagar Patil",
      title: "Associate Vice President: Acquisitions",
      quote: "Land is the one entity that at its core is limited, but provides unlimited opportunities for meaningful endeavours & purposeful benefits for our investments",
      image: "https://customer-assets.emergentagent.com/job_harmony-estates/artifacts/3irr6b73_Sagar.jpg",
      linkedin: "https://www.linkedin.com/in/sagarpatil03/"
    }
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

      {/* Group Companies */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#9B9068] font-medium tracking-wider text-sm uppercase">Our Ecosystem</span>
            <h2 className="font-display text-3xl md:text-4xl text-[#084a61] mt-4">Group Companies</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {groupCompanies.map((company, index) => (
              <div key={index} className="bg-[#f8f9f6] p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="font-display text-lg text-[#084a61] mb-4">{index + 1}. {company.name}</h3>
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

      {/* Key Statistics */}
      <section className="py-16 bg-[#084a61]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#9B9068] font-medium tracking-wider text-sm uppercase">Our Impact</span>
            <h2 className="font-display text-3xl md:text-4xl text-white mt-4">Key Statistics</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-display text-4xl md:text-5xl text-[#9B9068] mb-2">{stat.number}</p>
                <p className="text-white/70 text-sm">{stat.label}</p>
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
              <ul className="space-y-5 text-gray-700">
                {missionPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-[#9B9068] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#084a61]">{point.title}:</span>{' '}
                      <span>{point.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-14 h-14 bg-[#9B9068] rounded-full flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h2 className="font-display text-2xl text-[#084a61] mb-6">Our Vision</h2>
              <ul className="space-y-5 text-gray-700">
                {visionPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-[#9B9068] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#084a61]">{point.title}:</span>{' '}
                      <span>{point.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#9B9068] font-medium tracking-wider text-sm uppercase">Our Story</span>
            <h2 className="font-display text-3xl md:text-4xl text-[#084a61] mt-4">Our Journey</h2>
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

      {/* Media Coverage */}
      <section className="py-20 bg-[#f8f9f6]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#9B9068] font-medium tracking-wider text-sm uppercase font-display italic">Media</span>
            <h2 className="font-display text-3xl md:text-4xl text-[#9B9068] mt-2">Coverages</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {mediaItems.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <img src={item.image} alt="Media Coverage" className="w-full h-auto object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Leadership */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#9B9068] font-medium tracking-wider text-sm uppercase font-display italic">Meet Our</span>
            <h2 className="font-display text-3xl md:text-4xl text-[#9B9068] mt-2">Leadership</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {leadership.map((leader, index) => (
              <a 
                key={index} 
                href={leader.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#f8f9f6] p-5 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow cursor-pointer block"
              >
                <div className="w-28 h-28 mx-auto mb-4">
                  <img 
                    src={leader.image} 
                    alt={leader.name} 
                    className="w-full h-full object-cover object-top rounded-full shadow-md"
                  />
                </div>
                <h3 className="font-display text-lg text-[#084a61]">{leader.name}</h3>
                <p className="text-[#9B9068] font-medium text-xs mb-3">{leader.title}</p>
                <p className="text-gray-600 italic text-xs leading-relaxed">"{leader.quote}"</p>
              </a>
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
          <h2 className="font-display text-3xl md:text-4xl mb-8">Contact Information</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-white/90 text-lg md:text-xl">
              <strong>Corporate Office:</strong><br />
              No. 07, Level 3, VISTA PIXEL, 8/2B and 8/2C, Bellary Road, Jakkuru, Bengaluru, Karnataka 560092
            </p>
            <p className="text-white/90 text-lg md:text-xl">
              <strong>Phone:</strong> +91-9555 26 1111
            </p>
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
