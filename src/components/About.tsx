import React, { useEffect } from 'react';
    import AOS from 'aos';

    const About = () => {
      useEffect(() => {
        AOS.init({
          duration: 1000,
          once: true,
          easing: 'ease-out-cubic'
        });
      }, []);

      return (
        <div id="about" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
              <div className="relative" data-aos="fade-right">
              <img
                className="w-full h-[500px] object-contain rounded-xl"
                src="images/About_us.jpg"
                alt="Business Page"
              />

              </div>

              <div className="mt-12 lg:mt-0" data-aos="fade-left">
                <div className="text-base text-blue-600 font-semibold tracking-wide uppercase mb-6">
                  Our Story
                </div>
                <h2 className="text-4xl font-light text-gray-900 mb-8">
                  Empowering Business Growth Through Innovation
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  "At Heritage Triage, we believe in the power of strategic thinking and inclusive growth. Our mission is to empower businesses, with a special focus on underrepresented voices and women entrepreneurs, to achieve their full potential in the global marketplace."
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-12">
                  "We are dedicated to fostering sustainable growth through innovative solutions and comprehensive strategies that address the unique challenges faced by modern businesses."
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    };

    export default About;
