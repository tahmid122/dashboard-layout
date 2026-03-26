import { Navbar } from "@/components/shared/Navbar";
import { Sidebar } from "@/components/shared/Sidebar";
import React from "react";

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div
      className="flex max-h-screen min-h-screen flex-col overflow-y-scroll bg-[#ebf2f5] p-4 lg:p-8"
      style={{ paddingTop: "0px", paddingBottom: "0px" }}
    >
      {/* Navbar on top */}
      <Navbar />

      {/* Main content area */}
      <div className="mt-6 flex flex-1 gap-5.5">
        {/* Sidebar on the left */}
        <div className="hidden w-64 lg:flex">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="w-full flex-1 overflow-x-auto pb-2">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
