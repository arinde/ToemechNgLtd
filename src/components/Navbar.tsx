"use client"
import { X } from "lucide-react"

import Image from "next/image"
import { useState } from "react"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const toggleClick = () => {
        setIsOpen(!open)
    }
    return(
        <nav className="bg-gray-700 text-white font-serif backdrop-blur-sm">
            <div className="flex justify-around items-center h-16">
                <Image src="/development.jfif" alt="toemech" width={56} height={56} />

                <ul className="flex space-x-4">
                    <li>Gallery</li>
                    <li>Services</li>
                    <li>Team</li>
                    <li>Blog</li>
                    <li>Contact</li>
                </ul>
            </div>
        </nav>
    )
}