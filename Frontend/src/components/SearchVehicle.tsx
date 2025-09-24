"use client";

import React, { useState } from "react";

interface Vehicle {
  _id: string;
  name: string;
  capacityKg: number;
  tyres: string;
}

export default function SearchVehicle() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [capacityRequired, setCapacityRequired] = useState("");
  const [fromPincode, setFromPincode] = useState("");
  const [toPincode, setToPincode] = useState("");
  const [startTime, setStartTime] = useState("");
  const customerId = "12345"; // Replace with logged-in customer ID

  // Search vehicles
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);

    try {
      const query = new URLSearchParams({
        capacityRequired,
        fromPincode,
        toPincode,
        startTime,
      }).toString();

      const res = await fetch(`https://fleetlink-2g4z.onrender.com/api/vehicles/available?${query}`);
      const data = await res.json();

      if (res.ok) {
        setVehicles(data.availableVehicles);
      } else {
        alert(data.error || "Failed to fetch vehicles");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    setLoading(false);
  };

  // Book a vehicle
  const handleBook = async (vehicleId: string) => {
    if (!fromPincode || !toPincode || !startTime) {
      alert("Please fill search details first!");
      return;
    }

    try {
      const res = await fetch("https://fleetlink-2g4z.onrender.com/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicleId, fromPincode, toPincode, startTime, customerId }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Booking successful! Ride duration: ${data}h 🚛`);
      } else {
        alert(data.error || "Booking failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while booking");
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">🔍 Search Vehicle</h2>
      <form onSubmit={handleSearch} className="flex flex-col gap-4 mb-6">
        <input
          type="number"
          placeholder="Capacity Required (Kg)"
          className="border border-gray-300 rounded p-2"
          value={capacityRequired}
          onChange={(e) => setCapacityRequired(e.target.value)}
        />
        <input
          type="text"
          placeholder="From Pincode"
          className="border border-gray-300 rounded p-2"
          value={fromPincode}
          onChange={(e) => setFromPincode(e.target.value)}
        />
        <input
          type="text"
          placeholder="To Pincode"
          className="border border-gray-300 rounded p-2"
          value={toPincode}
          onChange={(e) => setToPincode(e.target.value)}
        />
        <input
          type="datetime-local"
          className="border border-gray-300 rounded p-2"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {vehicles.map((vehicle) => (
    <div
      key={vehicle._id}
      className="border rounded p-4 shadow hover:shadow-lg transition bg-amber-50"
    >
      <h3 className="font-semibold text-lg">{vehicle.name}</h3>
      <p>Capacity: {vehicle.capacityKg} Kg</p>
      <p>Tyres: {vehicle.tyres}</p>
      <button
        onClick={() => handleBook(vehicle._id)}
        className="mt-4 w-full bg-green-600 text-white rounded p-2 hover:bg-green-700"
      >
        Book
      </button>
    </div>
  ))}
</div>

    </div>
  );
}
