'use client';
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Search, Menu } from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "add":
        return <h2 className="text-xl font-semibold">🚛 Add Vehicle Page</h2>;
      case "search":
        return <h2 className="text-xl font-semibold">🔍 Search Vehicle Page</h2>;
      default:
        return (
          <h1 className="text-2xl font-bold text-center text-gray-700">
            Welcome to FleetLink 🚚
          </h1>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Navbar */}
      <div className="md:hidden fixed w-full bg-white shadow-md flex justify-between items-center p-4 z-30">
        <h2 className="text-lg font-bold text-blue-600">FleetLink</h2>
        <Button variant="outline" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu size={20} />
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-4 flex flex-col gap-4 transform transition-transform duration-300 z-40
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:flex`}
      >
        <h2 className="text-lg font-bold text-blue-600 mb-4 hidden md:block">FleetLink</h2>
        <Button
          variant={activeTab === "add" ? "default" : "outline"}
          className="flex items-center gap-2 justify-start"
          onClick={() => {
            setActiveTab("add");
            setSidebarOpen(false);
          }}
        >
          <Truck size={18} /> Add Vehicle
        </Button>
        <Button
          variant={activeTab === "search" ? "default" : "outline"}
          className="flex items-center gap-2 justify-start"
          onClick={() => {
            setActiveTab("search");
            setSidebarOpen(false);
          }}
        >
          <Search size={18} /> Search Vehicle
        </Button>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 mt-16 md:mt-0">
        <Card className="w-full max-w-2xl shadow-md rounded-2xl p-6 bg-white">
          <CardContent className="flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px]">
            {renderContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
