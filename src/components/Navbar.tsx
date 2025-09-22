"use client"

import Image from "next/image"
import { useState, useRef, useEffect } from "react" // Import useRef and useEffect
import Link from "next/link"
import { gsap } from "gsap" // Import gsap

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const mobileMenuRef = useRef(null) // Create a ref for the mobile menu
  const toggleClick = () => setIsOpen(!isOpen)

  useEffect(() => {
    // Check if the menu is open and the ref exists
    if (isOpen) {
      // Use GSAP to animate the list items
      gsap.fromTo(
        mobileMenuRef.current,
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        }
      )
      gsap.fromTo(
        ".mobile-menu-item", // Target the list items using a class
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1, // Stagger the animation for each item
          duration: 0.4,
          ease: "power2.out",
          delay: 0.1, // Delay the start of the item animation
        }
      )
    }
  }, [isOpen]) // Re-run the effect whenever isOpen changes

  return (
    <nav className="bg-none text-black items-center fixed z-50 w-full backdrop-blur-sm">
      <div className='flex items-center justify-center'>
        <div className="bg-gray-100 mt-6 py-2 md:w-[70%] w-[90%] rounded-full md:mx-auto md:px-4 px-3 sm:px-6 lg:px-8 flex md:justify-evenly justify-between items-center h-16">
          <Link href="/"><Image src="/Logo.png" alt="toemech" width={68} height={68} className="ml-3" /></Link>

          <ul className="md:flex hidden space-x-6 text-grey-800 font-medium">
            <li className="hover:text-blue-600 transition">About Us</li>
            <li className="hover:text-blue-600 transition">Services</li>
            <li className="hover:text-blue-600 transition">Team</li>
            <li className="hover:text-blue-600 transition">Blog</li>
            <li className="hover:text-blue-600 transition">Contact</li>
            <Link href="/login">Login</Link>
          </ul>

          {/* Hamburger/X Button */}
          <div
            className="md:hidden hover:border border-white/40 hover:bg-white/10 rounded-lg p-2"
            onClick={toggleClick}
          >
            <div className="relative w-8 h-6 cursor-pointer">
              {/* Top bar */}
              <span
                className={`absolute top-0 right-0 h-1 bg-blue-700 rounded transition-all duration-300 ${
                  isOpen
                    ? "rotate-45 top-2.5 left-0 right-0 w-6"
                    : "w-8 ml-auto top-0.5 -right-1"
                }`}
              />
              {/* Middle bar */}
              <span
                className={`absolute top-2.5 left-0 h-1 bg-blue-700 rounded transition-all duration-300 ${
                  isOpen ? "opacity-0" : "w-8 -top-2.5"
                }`}
              />
              {/* Bottom bar */}
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

      {isOpen && (
        <div 
          className="bg-white/90 mx-4 mt-1 backdrop-blur-md border-t rounded-2xl border-white/30 shadow-inner p-4"
          ref={mobileMenuRef} // Add the ref here
        >
          <ul className="flex flex-col items-start space-y-6 ml-3 justify-center text-gray-600 font-semibold font-serif">
            <li className="hover:text-blue-600 transition mobile-menu-item">Gallery</li>
            <li className="hover:text-blue-600 transition mobile-menu-item">Services</li>
            <li className="hover:text-blue-600 transition mobile-menu-item">Team</li>
            <li className="hover:text-blue-600 transition mobile-menu-item">Blog</li>
            <li className="hover:text-blue-600 transition mobile-menu-item">Contact</li>
            <Link href="/login" className="mobile-menu-item">Login</Link>
          </ul>
        </div>
      )}
    </nav>
  )
}