"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function Loading() {
  const logoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { scale: 0.8, opacity: 0.5 },
        {
          scale: 1.2,
          opacity: 1,
          repeat: -1,
          yoyo: true,
          duration: 1.2,
          ease: "power2.inOut",
        }
      );
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div ref={logoRef}>
        <Image
          src="/Logo.png" // ✅ replace with your company logo path
          alt="Company Logo"
          width={150}
          height={150}
          priority
        />
      </div>
    </div>
  );
}
