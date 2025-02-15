import React from 'react';
    import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

    const Footer = () => {
      return (
        <footer className="bg-gray-900">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center">
                  <img
                    src="public/images/heritage-logo.jpg"
                    alt="Heritage Triage Logo"
                    className="h-6 w-auto text-blue-500"
                  />
                  <span className="ml-2 text-xl font-bold text-white">Heritage Triage</span>
                </div>
                <p className="mt-4 text-gray-400 max-w-md">
                  Your trusted partner in strategic growth and innovation. Empowering businesses globally through comprehensive consulting services.
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Quick Links</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#home" className="text-base text-gray-300 hover:text-white">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="text-base text-gray-300 hover:text-white">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="#about" className="text-base text-gray-300 hover:text-white">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="text-base text-gray-300 hover:text-white">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Connect With Us</h3>
                <div className="mt-4 flex space-x-6">
                  <a href="#" className="text-gray-400 hover:text-white">
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <Instagram className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-8 border-t border-gray-700 pt-8">
              <p className="text-base text-gray-400 text-center">
                © {new Date().getFullYear()} Heritage Triage. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      );
    };

    export default Footer;
