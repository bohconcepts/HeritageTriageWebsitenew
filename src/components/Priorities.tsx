import React from 'react';
import { Target, Lightbulb, PieChart } from 'lucide-react';

const priorities = [
  {
    icon: Target,
    title: 'Client-Centric Solutions',
    description: 'Always putting the client’s business goals and outcomes first.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation and Efficiency',
    description: 'Continuously exploring creative solutions that drive sustainable growth.'
  },
  {
    icon: PieChart,
    title: 'Data-Driven Insights',
    description: 'Leveraging data and analytics to guide decisions and deliver impactful strategies.'
  },
  {
    icon: Lightbulb,
    title: 'Compliance and Risk Mitigation',
    description: 'Ensuring that all strategies are aligned with industry regulations, reducing risks for clients and following international host country’s local content and public policy.'
  },
  {
    icon: PieChart,
    title: 'Long-Term Partnerships',
    description: 'Moving beyond short-term fixes to build long-lasting, meaningful relationships with clients.'
  }
];

const Priorities = () => {
  return (
    <section id="priorities" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">What We Prioritize for Your Success</h2>
          <p className="mt-4 text-xl text-gray-600">
            Focused approaches that drive sustainable growth
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-3">
          {priorities.map((priority, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300">
                  <priority.icon className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="mt-8 text-xl font-bold text-gray-900">{priority.title}</h3>
                <p className="mt-4 text-base text-gray-600 max-w-xs">
                  {priority.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Priorities;
