import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <img
              src="images/heritage-logo.jpg"
              alt="Heritage Triage Logo"
              className={`h-8 w-auto ${isScrolled ? 'text-blue-600' : 'text-white'}`}
            />
            <span className={`ml-2 text-xl font-light ${isScrolled ? 'text-gray-900' : 'text-white'}`}>Heritage Triage</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className={`font-light hover:text-blue-600 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>Home</a>
            <a href="#services" className={`font-light hover:text-blue-600 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>Services</a>
            <a href="#priorities" className={`font-light hover:text-blue-600 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>Strategic Focus</a>
            <a href="#understanding-industry-trends" className={`font-light hover:text-blue-600 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>Foreign Direct Investments</a>
            <a href="#about" className={`font-light hover:text-blue-600 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>About</a>
            <a href="#contact" className={`px-6 py-2 border-2 ${isScrolled ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white' : 'border-white text-white hover:bg-white hover:text-gray-900'} transition-colors`}>
              Contact Us
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${isScrolled ? 'text-gray-900' : 'text-white'} hover:text-blue-600 focus:outline-none transition-colors`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#home" className="block px-3 py-2 text-gray-900 hover:text-blue-600">Home</a>
            <a href="#services" className="block px-3 py-2 text-gray-900 hover:text-blue-600">Services</a>
            <a href="#priorities" className="block px-3 py-2 text-gray-900 hover:text-blue-600">Priorities</a>
            <a href="#understanding-industry-trends" className="block px-3 py-2 text-gray-900 hover:text-blue-600">Foreign Direct Investment</a>
            <a href="#about" className="block px-3 py-2 text-gray-900 hover:text-blue-600">About</a>
            <a href="#contact" className="block px-3 py-2 text-blue-600 font-medium">Contact Us</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
