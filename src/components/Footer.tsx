"use client";
import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0b0f19] text-gray-300 relative">
      {/* Top Border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 via-cyan-400 to-green-500" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide">Toemech Nigeria Ltd</h2>
          <h3 className="text-gray-100 text-sm font-serif font-bold leading-relaxed">RC: 480129</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Delivering cutting-edge mechanical and electrical engineering solutions
            with precision, safety, and innovation.
          </p>
          <div className="flex gap-4">
            {[
              { icon: Facebook, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Instagram, href: "#" },
            ].map(({ icon: Icon, href }, i) => (
              <Link
                key={i}
                href={href}
                className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition-colors"
              >
                <Icon className="w-4 h-4 text-white" />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {["Home", "About Us", "Services", "Projects", "Contact"].map((link) => (
              <li key={link}>
                <Link
                  href={`#${link.toLowerCase().replace(" ", "")}`}
                  className="hover:text-blue-400 transition-colors"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Our Services</h3>
          <ul className="space-y-2 text-sm">
            {[
              "Mechanical Fabrication",
              "Electrical Installation",
              "Industrial Maintenance",
              "Welding & Pipework",
            ].map((service) => (
              <li key={service} className="hover:text-blue-400 transition-colors">
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 mt-1" />
              <span>15, titus towoju street, apeka estate, ikorodu lagos state.</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-400" />
              <a href="tel:+2348023444635" className="hover:text-blue-400 transition-colors">
                +2348023444635, +2349124046666
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <a href="mailto:tomech2013@gmail.com" className="hover:text-blue-400 transition-colors">
                tomech2013@gmail.com
              </a>
            </li>
          </ul>

          {/* Newsletter */}
          <div className="mt-6">
            <p className="text-sm mb-3 text-gray-400">Subscribe for updates</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center bg-gray-800 rounded-full overflow-hidden"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder-gray-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 p-2 rounded-full transition-colors"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-8 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Toemech. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
