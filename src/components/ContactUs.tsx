import React, { useState, useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import ContactInfo from '../components/ContactInfo';

const backgroundImages: string[] = [
  '/toemech7.jpeg',
  '/toemech5.jpeg',
  '/toemech6.jpeg',
  '/toemech9/jpeg',
  '/toemech10/jpeg',
];

const ContactPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []); 

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section with Carousel Background */}
      <div
        className="relative h-64 bg-blue-800 flex items-center justify-center p-4 transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${backgroundImages[currentImageIndex]}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center text-white z-10">
          <h1 className="text-4xl font-bold">Talk to Us</h1>
          <p className="mt-2 text-lg">Reach us anytime for quick support.</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className=" mx-auto py-12 px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <ContactForm />
          <div className="md:mt-8 md:ml-12">
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;