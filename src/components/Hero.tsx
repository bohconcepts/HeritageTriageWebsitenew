import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div id="home" className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
          alt="Office background"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl" data-aos="fade-right">
          <h1 className="text-6xl font-light text-white mb-6">
            Strategic Growth & Innovation
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl">
            Empowering businesses globally through strategic consulting, innovative solutions, and sustainable growth strategies.
          </p>
          <div className="flex gap-x-6">
            <a
              href="#contact"
              className="px-8 py-4 bg-white text-gray-900 text-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Book a Consultation
              <ArrowRight className="inline-block ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
