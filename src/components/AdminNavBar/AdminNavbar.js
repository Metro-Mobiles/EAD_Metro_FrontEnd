import React, { useState } from "react";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";

export default function AdminNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col h-screen">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* TopBar */}
      <div className="flex-grow">
        <TopBar toggleSidebar={toggleSidebar} />
      </div>

      {/* Overlay for mobile view */}
      <div
        className={`fixed z-20 inset-0 flex md:hidden ${
          isSidebarOpen ? "bg-black opacity-50" : "hidden"
        }`}
        onClick={toggleSidebar}
      />
    </div>
  );
}