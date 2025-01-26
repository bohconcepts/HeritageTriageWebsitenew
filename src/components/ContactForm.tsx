import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-20" data-aos="fade-up">
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Let's Start Your Journey
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600">
            Ready to transform your business? Get in touch with us today.
          </p>
        </div>

        <div className="max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
            </div>

            <div>
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border-none focus:ring-2 focus:ring-blue-600"
                required
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
              >
                Send Message
                <Send className="ml-2 h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
