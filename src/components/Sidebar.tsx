"use client";

import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { LayoutGrid, UserPlus, Home, Menu, X, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

type TabType = "dashboard" | "register" | "homepage";

type SidebarProps = {
  activeTab: TabType;
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>;
};

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Animate sidebar slide
  useEffect(() => {
    gsap.to(".sidebar-panel", {
      x: isOpen ? 0 : -240,
      duration: 0.35,
      ease: "power3.out",
    });
  }, [isOpen]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: <LayoutGrid size={20} /> },
    { key: "register", label: "Register Staff", icon: <UserPlus size={20} /> },
    { key: "homepage", label: "Homepage", icon: <Home size={20} /> },
  ];

  return (
    <>
      {/* 🔘 Mobile Toggle */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        aria-label="Toggle sidebar"
        className={`fixed top-4 z-50 p-1 rounded-md shadow-md md:hidden transition-all duration-300
          ${isOpen ? "left-60 bg-red-600 hover:bg-red-700" : "left-4 bg-gray-50 hover:bg-gray-900"}`}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Menu className="w-8 h-8 text-blue-600" />
        )}
      </button>

      {/* 🟢 Sidebar */}
      <aside
        className={`sidebar-panel fixed top-0 left-0 h-screen w-60 bg-white border-r border-gray-200 shadow-xl
        flex flex-col px-4 py-6 z-40 transform md:translate-x-0`}
      >
        {/* 🏢 Logo Placeholder */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200 mb-6">
          {/* Replace with <Image src="/logo.png" ... /> */}
          <span className="text-lg font-bold text-gray-800">Company Logo</span>
        </div>

        {/* Links */}
        <nav className="space-y-4 text-gray-700 flex-1 overflow-y-auto mt-4">
          {navItems.map(({ key, label, icon }) => (
            <SidebarLink
              key={key}
              label={label}
              icon={icon}
              isActive={activeTab === key}
              onClick={() => {
                setActiveTab(key as TabType);
                setIsOpen(false); // close on mobile
              }}
            />
          ))}
        </nav>

        {/* 🚪 Logout (fixed bottom) */}
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

function SidebarLink({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 px-2 py-2 rounded-md transition
        ${isActive ? "bg-gray-200 font-medium text-gray-900" : "hover:bg-gray-100"}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
