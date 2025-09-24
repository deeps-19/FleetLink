"use client";

import React, { useState } from "react";

export default function AddVehicle() {
  const [name, setName] = useState("");
  const [capacityKg, setCapacityKg] = useState("");
  const [tyres, setTyres] = useState("");
  const [loading, setLoading] = useState(false);
  console.log("AddVehicle component rendered");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name || !capacityKg || !tyres) return;

    const vehicleData = {
      name,
      capacityKg: Number(capacityKg),
      tyres: Number(tyres),
    };
    console.log(vehicleData);
   try {
  setLoading(true);
  const res = await fetch("https://fleetlink-2g4z.onrender.com/api/vehicles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehicleData),
  });

  console.log("Response status:", res.status); // 🔹 log status

  if (!res.ok) {
    const errorData = await res.json();
    console.log("Server error:", errorData); // 🔹 log server error
    alert(`Error: ${errorData.error || "Failed to add vehicle"}`);
    return;
  }

  const createdVehicle = await res.json();
  console.log("Vehicle created:", createdVehicle); // 🔹 log success
  alert(`Vehicle added! 🚛 ID: ${createdVehicle._id}`);

  // Clear form
  setName("");
  setCapacityKg("");
  setTyres("");
} catch (err) {
  console.log("Network or unexpected:", err); // 🔹 this runs only for network errors
  alert("Something went wrong while adding the vehicle.");
} finally {
  setLoading(false);
}

  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">🚛 Add Vehicle</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Vehicle Name"
          className="border border-gray-300 rounded p-2"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Vehicle Capacity"
          className="border border-gray-300 rounded p-2"
          required
          value={capacityKg}
          onChange={(e) => setCapacityKg(e.target.value)}
        />
        <input
          type="number"
          placeholder="Tyres"
          className="border border-gray-300 rounded p-2"
          required
          value={tyres}
          onChange={(e) => setTyres(e.target.value)}
        />
        <button
          type="submit"
          className={`bg-blue-600 text-white rounded p-2 hover:bg-blue-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Vehicle"}
        </button>
      </form>
    </div>
  );
}
