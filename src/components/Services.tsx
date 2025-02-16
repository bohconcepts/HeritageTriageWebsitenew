import React from 'react';
import { 
  Briefcase, 
  Users, 
  Globe, 
  CalendarCheck, 
  Megaphone 
} from 'lucide-react';

const services = [
  {
    icon: Briefcase,
    title: 'Market Entry Advisory',
    description: 'Navigate new markets with confidence. We provide in-depth market insights, competitive analysis, and strategic entry plans to ensure your international expansion is seamless and successful.'
  },
  {
    icon: Users,
    title: 'Business Matchmaking',
    description: 'Expand your global network through our targeted matchmaking services. We connect you with the right partners, suppliers, and investors to accelerate your business growth.'
  },
  {
    icon: Globe,
    title: 'International Trade Missions',
    description: 'Enhance your global presence by participating in high-impact trade missions, expos, and networking events, tailored to maximize visibility and business opportunities.'
  },
  {
    icon: CalendarCheck,
    title: 'Trade Event Promotion',
    description: 'Boost your market reach with expertly curated promotional events. We help position your business in key international trade fairs and networking platforms for maximum exposure.'
  },
  {
    icon: Megaphone,
    title: 'Foreign Direct Investment (FDI)',
    description: 'Unlock global investment opportunities. Our FDI advisory services guide businesses in securing international investments, mitigating risks, and optimizing cross-border ventures.'
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
              className="group cursor-pointer bg-gray-50 p-8 rounded-xl shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <service.icon className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
