import React from 'react';
import { Target, Lightbulb, PieChart } from 'lucide-react';

const priorities = [
  {
    icon: Target,
    title: 'Identifying Opportunities',
    description: 'Discover and leverage competitive advantages in your market space.'
  },
  {
    icon: Lightbulb,
    title: 'In-Market Expertise',
    description: 'Utilize deep market knowledge and industry expertise for optimal results.'
  },
  {
    icon: PieChart,
    title: 'Capital Allocation',
    description: 'Optimize resource distribution for maximum business impact and growth.'
  }
];

const Priorities = () => {
  return (
    <section id="priorities" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Strategic Priorities</h2>
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
