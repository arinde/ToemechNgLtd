"use client"

import Image from "next/image"
import { useState } from "react"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const toggleClick = () => {
        setIsOpen(!isOpen)
    }
    return(
        <nav className="bg-gray-500 text-white font-serif backdrop-blur-sm">
            <div className="flex md:justify-around justify-between mx-10 md:mx-auto items-center h-16">
                <Image src="/Logo.png" alt="toemech" width={56} height={56} />

                <ul className="md:flex hidden space-x-4">
                    <li>About Us</li>
                    <li>Services</li>
                    <li>Team</li>
                    <li>Blog</li>
                    <li>Contact</li>
                </ul>

                {/* Hamburger/X Button */}
                <div className="md:hidden mr-4 hover:border border-blue-50 hover:bg-blue-50 hover:rounded-lg hover:py-2 pl-2" onClick={toggleClick}>
                    <div className="relative w-8 h-6 cursor-pointer">
                        {/* Top bar */}
                        <span
                        className={`absolute top-0 right-0 h-1 bg-blue-700 transition-all duration-300 ${
                            isOpen
                            ? 'rotate-45 top-2.5 left-0 right-0 w-6'
                            : 'w-5 ml-auto top-0.5 -right-1'
                        }`}
                        />
                        {/* Middle bar */}
                        <span
                        className={`absolute top-2.5 left-0 h-1 bg-blue-700 transition-all duration-300 ${
                            isOpen ? 'opacity-0' : 'w-8 -top-2.5'
                        }`}
                        />
                        {/* Bottom bar */}
                        <span
                        className={`absolute bottom-0 left-0 h-1 bg-blue-700 transition-all duration-300 ${
                            isOpen
                            ? '-rotate-45 bottom-2.5 left-0 right-0 w-6'
                            : 'w-5 mr-auto top-4.5'
                        }`}
                        />
                    </div>
                </div>
            </div>

            {isOpen && 
                <div className="bg-yellow-400">
                    <ul className="flex space-x-4">
                        <li>Gallery</li>
                        <li>Services</li>
                        <li>Team</li>
                        <li>Blog</li>
                        <li>Contact</li>
                    </ul>
                </div>
            }
        </nav>
    )
}