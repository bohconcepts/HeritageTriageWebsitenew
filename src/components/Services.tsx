import React from 'react';
import { 
  Briefcase, 
  TrendingUp, 
  Palette, 
  Megaphone, 
  Globe 
} from 'lucide-react';

const services = [
  {
    icon: Briefcase,
    title: 'Market Entry Advisory',
    description: 'Many businesses struggle to expand internationally due to a lack of market knowledge, resources, and connections, which limits their ability to compete on a global scale. Without the right support, entering new markets can be overwhelming, costly, and fraught with risks, leading to missed opportunities and stunted growth. Our comprehensive market entry reports provide businesses with the insights they need to understand new markets, assess competition, and develop effective entry strategies.'
  },
  {
    icon: TrendingUp,
    title: 'Business Matchmaking',
    description: 'We facilitate meaningful connections through targeted matchmaking meetings that pair your businesses with the right international partners, suppliers, and buyers, offering curated networking opportunities, direct meetings, and valuable market insights that drive export growth.'
  },
  {
    icon: Palette,
    title: 'International Trade Missions',
    description: 'Provide guidance on the right trade mission for your business. Enhance your brand visibility and recognition on the global stage. We identify the right international trade shows, expos, and promotional events to elevate your companys profile, connect you with key decision-makers, and showcase your products and services to a wider audience.'
  },
  {
    icon: Megaphone,
    title: 'Trade Event Promotion',
    description: 'Supporting your business in international markets by providing tailored promotional events that gives you access to key industry players, host government officials, meeting through the right marketing channels. Effective promotion strategies to increase brand awareness and market penetration. Connect with the right partners, distributors, suppliers, and customers in target markets. Our extensive network of international contacts allows us to identify key opportunities and facilitate strategic partnerships, boosting your growth prospects abroad.'
  },
  {
    icon: Globe,
    title: 'Foreign Direct Investment',
    description: 'Ready to take your region’s growth to the next level? Connect with one of our consultants and Tap into lucrative foreign investment opportunities with our FDI advisory services. We help U.S. companies navigate the complexities of cross-border investments, guiding you in selecting the right investment projects, mitigating risks, and optimizing returns in international markets. Tailored strategies, insights, and recommendations that can unlock your investment potential and help you access international business. Let’s work together to build a roadmap for your success.'
  }
];

const Services = () => {
  return (
    <section id="services" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-4xl font-light text-gray-900 mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <div className="p-8 bg-white transition-transform duration-300 group-hover:-translate-y-2">
                  <service.icon className="h-12 w-12 text-blue-600 mb-6" />
                  <h3 className="text-2xl font-light text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
