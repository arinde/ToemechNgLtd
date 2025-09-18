"use client";

import AboutSection from "@/components/AboutUs";
import HeroSection from "@/components/Hero";
import ServicesSection from "@/components/Services"

export default function Home() {

  //const router = useRouter();
    return(
      <>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
      </>
      
  )
  
}