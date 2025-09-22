import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppFAB = () => {
  return (
    <a
      href="https://wa.me/2348023444635?text=Hello%20Toemech%2C%20I%27d%20like%20to%20get%20a%20quote."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg z-50 transition-all animate-pulse block md:hidden"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="w-6 h-6" />
    </a>
  );
};

export default WhatsAppFAB;
