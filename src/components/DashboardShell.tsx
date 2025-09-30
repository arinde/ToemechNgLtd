// components/DashboardShell.tsx
"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

// ✅ Use the same TabType as Sidebar
type TabType = "dashboard" | "register" | "homepage";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      // You can add a toast.error here if desired
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar now matches the new TabType */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main content */}
      <main className="flex-1 p-6 lg:ml-60">{children}</main>
    </div>
  );
}
