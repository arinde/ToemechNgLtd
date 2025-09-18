"use client"

import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleClick = () => setIsOpen(!isOpen)

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/20 backdrop-blur-md border-b border-white/30 shadow-md">
      <div className="flex md:justify-around justify-between mx-10 md:mx-auto items-center h-16">
        <Link href="/"><Image src="/Logo.png" alt="toemech" width={80} height={80} /></Link>

        <ul className="md:flex hidden space-x-6 text-gray-900 font-medium">
          <li className="hover:text-blue-600 transition">About Us</li>
          <li className="hover:text-blue-600 transition">Services</li>
          <li className="hover:text-blue-600 transition">Team</li>
          <li className="hover:text-blue-600 transition">Blog</li>
          <li className="hover:text-blue-600 transition">Contact</li>
          <Link href="/login">Login</Link>
        </ul>

        {/* Hamburger/X Button */}
        <div
          className="md:hidden mr-4 hover:border border-white/40 hover:bg-white/10 rounded-lg p-2"
          onClick={toggleClick}
        >
          <div className="relative w-8 h-6 cursor-pointer">
            {/* Top bar */}
            <span
              className={`absolute top-0 right-0 h-1 bg-blue-700 rounded transition-all duration-300 ${
                isOpen
                  ? "rotate-45 top-2.5 left-0 right-0 w-6"
                  : "w-5 ml-auto top-0.5 -right-1"
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
                  : "w-5 mr-auto top-4.5"
              }`}
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="bg-white/20 backdrop-blur-md border-t border-white/30 shadow-inner p-4">
          <ul className="flex flex-col space-y-3 text-gray-900 font-medium">
            <li className="hover:text-blue-600 transition">Gallery</li>
            <li className="hover:text-blue-600 transition">Services</li>
            <li className="hover:text-blue-600 transition">Team</li>
            <li className="hover:text-blue-600 transition">Blog</li>
            <li className="hover:text-blue-600 transition">Contact</li>
          </ul>
        </div>
      )}
    </nav>
  )
}
