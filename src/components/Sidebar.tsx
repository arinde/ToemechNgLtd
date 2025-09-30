"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { LayoutGrid, UserPlus, Home, Menu, X, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Image from "next/image";

type TabType = "dashboard" | "register" | "homepage";

type SidebarProps = {
  activeTab: TabType;
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>;
};

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true); // ✅ Start open on desktop
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ Animate sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      gsap.to(".sidebar-panel", {
        x: isOpen ? 0 : -240,
        duration: 0.35,
        ease: "power3.out",
      });
    } else {
      gsap.set(".sidebar-panel", { x: 0 }); // always visible on desktop
    }
  }, [isOpen, isMobile]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: <LayoutGrid size={20} />, href: "/dashboard" },
    { key: "register", label: "Register Staff", icon: <UserPlus size={20} />, href: "/staffReg" },
    { key: "homepage", label: "Homepage", icon: <Home size={20} />, href: "/" },
  ];

  return (
    <>
      {/* 🔘 Mobile Toggle */}
      {isMobile && (
        <button
          onClick={() => setIsOpen((p) => !p)}
          aria-label="Toggle sidebar"
          className={`fixed top-4 z-50 p-1 rounded-md shadow-md transition-all duration-300
            ${isOpen ? "left-60 bg-red-600 hover:bg-red-700" : "left-4 bg-gray-50 hover:bg-gray-900"}`}
        >
          {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-8 h-8 text-blue-600" />}
        </button>
      )}

      {/* 🟢 Sidebar */}
      <aside
        className={`sidebar-panel fixed top-0 left-0 h-screen w-60 bg-white border-r border-gray-200 shadow-xl
        flex flex-col px-4 py-6 z-40 transform md:translate-x-0`}
      >
        {/* 🏢 Logo Placeholder */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200 mb-6">
           <Link href="/">
            <Image
              src="/Logo.png"
              alt="toemech"
              width={72}
              height={72}
            />
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="space-y-4 text-gray-700 flex-1 overflow-y-auto mt-4">
          {navItems.map(({ key, label, icon, href }) => (
            <SidebarLink
              key={key}
              label={label}
              icon={icon}
              href={href}
              isActive={activeTab === key}
              onClick={() => {
                setActiveTab(key as TabType);
                if (isMobile) setIsOpen(false); // close sidebar on mobile
              }}
            />
          ))}
        </nav>

        {/* 🚪 Logout */}
        <button
          onClick={handleLogout}
          className="fixed bottom-6 left-4 w-52 flex items-center gap-2 px-2 py-2 rounded-md hover:bg-red-50 text-red-600 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>
    </>
  );
}

/* 🔗 Sidebar Link Component */
function SidebarLink({
  icon,
  label,
  href,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex w-full items-center gap-2 px-2 py-2 rounded-md transition
        ${isActive ? "bg-gray-200 font-medium text-gray-900" : "hover:bg-gray-100"}`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
