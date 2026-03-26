/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useEffect, useState } from "react";
import ReuseableMenuItems from "./ReuseableMenuItems";
import LogoutButton from "./LogoutButton";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const path = usePathname();

  const [activeItem, setActiveItem] = useState<string>("dashboard");
  useEffect(() => {
    const modifiedPath = path.split("/");
    setActiveItem(modifiedPath[1] || "dashboard");
  }, [path]);
  return (
    <aside
      id="sideBar"
      className="bg-sidebar brand-shadow sticky top-20 left-0 z-50 hidden max-h-[calc(100vh-5rem)] w-64 flex-col rounded-[16px] lg:flex"
    >
      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto px-3 py-6">
        {/* Reuseable menu Items */}
        <ReuseableMenuItems
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      </nav>

      {/* Divider */}
      <div className="bg-sidebar-border mx-4 h-px" />

      {/* Logout Button */}
      <div className="p-4">
        <LogoutButton />
      </div>
    </aside>
  );
}
