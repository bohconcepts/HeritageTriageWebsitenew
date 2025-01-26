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
    title: 'Project Management',
    description: 'Expert project management services ensuring timely delivery and optimal resource utilization.'
  },
  {
    icon: TrendingUp,
    title: 'Business Growth Advisory',
    description: 'Strategic guidance to accelerate your business growth and maximize market opportunities.'
  },
  {
    icon: Palette,
    title: 'Branding & Marketing Strategy',
    description: 'Comprehensive branding solutions and marketing strategies to enhance your market presence.'
  },
  {
    icon: Megaphone,
    title: 'Business Promotion',
    description: 'Effective promotion strategies to increase brand awareness and market penetration.'
  },
  {
    icon: Globe,
    title: 'International Expansion',
    description: 'Facilitate foreign direct investment and guide international business expansion.'
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
