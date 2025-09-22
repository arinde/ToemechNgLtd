"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const toggleClick = () => setIsOpen(!isOpen);

  // ✅ Listen for login/logout changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ? currentUser.uid : null);
    });
    return () => unsubscribe();
  }, []);

  // ✅ GSAP animation for mobile menu
  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        ".mobile-menu-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.1,
        }
      );
    }
  }, [isOpen]);

  const navItems = [
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Team", href: "#team" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="bg-none text-black items-center fixed z-50 w-full backdrop-blur-sm">
      <div className="flex items-center justify-center">
        <div className="bg-gray-100 mt-6 py-2 md:w-[70%] w-[90%] rounded-full md:mx-auto md:px-4 px-3 sm:px-6 lg:px-8 flex md:justify-evenly justify-between items-center h-16">
          {/* ✅ Logo */}
          <Link href="/">
            <Image
              src="/Logo.png"
              alt="toemech"
              width={68}
              height={68}
              className="ml-3"
            />
          </Link>

          {/* ✅ Desktop Nav */}
          <ul className="md:flex hidden space-x-8 font-serif font-medium text-gray-800">
            {navItems.map((item) => (
              <li key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="transition-colors duration-200 hover:text-blue-600"
                >
                  {item.name}
                  <span className="absolute left-0 -bottom-1 block h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}

            {/* ✅ Login changes to Dashboard when logged in */}
            <li className="relative group">
              {user ? (
                <Link
                  href="/dashboard"
                  className="transition-colors duration-200 hover:text-blue-600"
                >
                  Dashboard
                  <span className="absolute left-0 -bottom-1 block h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="transition-colors duration-200 hover:text-blue-600"
                >
                  Login
                  <span className="absolute left-0 -bottom-1 block h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                </Link>
              )}
            </li>
          </ul>

          {/* ✅ Mobile Hamburger */}
          <div
            className="md:hidden hover:border border-white/40 hover:bg-white/10 rounded-lg p-2"
            onClick={toggleClick}
          >
            <div className="relative w-8 h-6 cursor-pointer">
              <span
                className={`absolute top-0 right-0 h-1 bg-blue-700 rounded transition-all duration-300 ${
                  isOpen
                    ? "rotate-45 top-2.5 left-0 right-0 w-6"
                    : "w-8 ml-auto top-0.5 -right-1"
                }`}
              />
              <span
                className={`absolute top-2.5 left-0 h-1 bg-blue-700 rounded transition-all duration-300 ${
                  isOpen ? "opacity-0" : "w-8 -top-2.5"
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-1 bg-blue-700 rounded transition-all duration-300 ${
                  isOpen
                    ? "-rotate-45 bottom-2.5 left-0 right-0 w-6"
                    : "w-8 mr-auto top-4.5"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="bg-white/90 mx-4 mt-1 backdrop-blur-md border-t rounded-2xl border-white/30 shadow-inner p-4"
        >
          <ul className="flex flex-col items-start space-y-6 ml-3 justify-center text-gray-600 font-semibold font-serif">
            {navItems.map((item) => (
              <li
                key={item.name}
                className="mobile-menu-item hover:text-blue-600 transition"
              >
                <Link href={item.href} onClick={toggleClick}>
                  {item.name}
                </Link>
              </li>
            ))}

            {/* ✅ Mobile Login changes to Dashboard */}
            <li className="mobile-menu-item hover:text-blue-600 transition">
              {user ? (
                <Link href="/dashboard" onClick={toggleClick}>
                  Dashboard
                </Link>
              ) : (
                <Link href="/login" onClick={toggleClick}>
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
