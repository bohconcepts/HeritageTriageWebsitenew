import React, { useState, useCallback } from 'react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import { submitContactForm } from '../services/contactService';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Contact information constants
const CONTACT_INFO = {
  phone: '425-761-1874',
  email: 'adwoa-adubra@heritagetriage.com',
  address: '27171 SE 25th PL, Sammamish, WA 98075',
  location: { lat: 47.584, lng: -122.034 } // Approximate coordinates for Sammamish
};

// Map container style
const mapContainerStyle = {
  width: '100%',
  height: '300px'
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    error: null as string | null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ submitted: false, submitting: true, error: null });
    
    try {
      await submitContactForm(formData);
      
      // Reset form and show success message
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
      setStatus({ submitted: true, submitting: false, error: null });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({ 
        submitted: false, 
        submitting: false, 
        error: error instanceof Error ? error.message : 'An error occurred. Please try again.' 
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Map click handler (optional, for future functionality)
  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    console.log('Map clicked at:', e.latLng?.lat(), e.latLng?.lng());
  }, []);

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" data-aos="fade-up" data-aos-delay="100">
          <div className="space-y-8">
          {status.submitted ? (
            <div className="text-center p-8 bg-green-50 rounded-lg">
              <h3 className="text-xl font-medium text-green-800 mb-2">Thank you!</h3>
              <p className="text-green-700">Your message has been sent successfully.</p>
              <button 
                onClick={() => setStatus({ submitted: false, submitting: false, error: null })}
                className="mt-4 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 rounded"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {status.error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                  {status.error}
                </div>
              )}
              
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
                    disabled={status.submitting}
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
                    disabled={status.submitting}
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
                  disabled={status.submitting}
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
                  disabled={status.submitting}
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
                  disabled={status.submitting}
                >
                  {status.submitting ? 'Sending...' : 'Send Message'}
                  {!status.submitting && <Send className="ml-2 h-5 w-5" />}
                </button>
              </div>
            </form>
          )}
          </div>
          
          {/* Contact Information and Map */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-light text-gray-900 mb-6">Contact Information</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <p className="text-lg font-medium">{CONTACT_INFO.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-lg font-medium">{CONTACT_INFO.email}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Address</p>
                  <p className="text-lg font-medium">{CONTACT_INFO.address}</p>
                </div>
              </div>
            </div>
            
            {/* Google Map */}
            <div className="rounded-lg overflow-hidden shadow-sm">
              <LoadScript googleMapsApiKey="AIzaSyASL_O1K1mfWzGvsgaWDefebx_lFHI51oU" loadingElement={<div className="h-[300px] bg-gray-100 flex items-center justify-center">Loading map...</div>}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={CONTACT_INFO.location}
                  zoom={14}
                  onClick={onMapClick}
                >
                  <Marker position={CONTACT_INFO.location} />
                </GoogleMap>
              </LoadScript>
              <p className="text-xs text-gray-500 mt-2 text-center">Map data ©2025 Google</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
//try
export default ContactForm;
