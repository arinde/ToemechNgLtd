"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
   const hideLayout =
    pathname.startsWith("/dashboard") ||
    pathname === "/staffReg" ||
    pathname.startsWith("/auth"); // optional extra checks

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
