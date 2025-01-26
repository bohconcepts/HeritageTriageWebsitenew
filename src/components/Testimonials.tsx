import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Emily Chen',
    role: 'CEO, TechStart Inc.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    content: 'Heritage Triage transformed our business strategy. Their insights helped us expand into new markets with confidence.',
    stars: 5
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Founder, GreenPath Solutions',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
    content: "The team's dedication to sustainable growth strategies aligned perfectly with our vision. They delivered beyond our expectations.",
    stars: 5
  },
  {
    name: 'Sarah Williams',
    role: 'Director, Global Ventures',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80',
    content: 'Working with Heritage Triage was a game-changer. Their strategic approach to international expansion was invaluable.',
    stars: 5
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Client Success Stories</h2>
          <p className="mt-4 text-xl text-gray-600">
            Hear from our valued clients about their experience working with us
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-16 w-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
