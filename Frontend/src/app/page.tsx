"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Search } from "lucide-react";
import AddVehicle from "@/components/AddVehicle";
import SearchVehicle from "@/components/SearchVehicle";

export default function Page() {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "add":
        return <AddVehicle />;
      case "search":
        return <SearchVehicle />;
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
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-4 flex flex-col gap-4">
        <h2 className="text-lg font-bold text-blue-600 mb-4">FleetLink</h2>
        <Button
          variant={activeTab === "add" ? "default" : "outline"}
          className="flex items-center gap-2 justify-start"
          onClick={() => setActiveTab("add")}
        >
          <Truck size={18} /> Add Vehicle
        </Button>
        <Button
          variant={activeTab === "search" ? "default" : "outline"}
          className="flex items-center gap-2 justify-start"
          onClick={() => setActiveTab("search")}
        >
          <Search size={18} /> Search Vehicle
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl shadow-md rounded-2xl p-6 bg-white">
          <CardContent className="flex flex-col items-center justify-start h-96 w-full">
            {renderContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
