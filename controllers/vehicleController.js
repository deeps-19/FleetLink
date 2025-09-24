import Vehicle from "../models/Vehicle.js";
import Booking from "../models/Vehicle.js";

// @desc Add a new vehicle
// @route POST /api/vehicles
// @access Public
export const addVehicle = async (req, res) => {
  try {
    const { name, capacityKg, tyres } = req.body;

    // Validation
    if (!name || !capacityKg || !tyres) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (typeof name !== "string" || typeof capacityKg !== "number" || typeof tyres !== "number") {
      return res.status(400).json({ error: "Invalid data types" });
    }

    const newVehicle = new Vehicle({ name, capacityKg, tyres });
    const savedVehicle = await newVehicle.save();

    res.status(201).json(savedVehicle);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

export const getAvailableVehicles = async (req, res) => {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query;

    // Validate required query params
    if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
      return res.status(400).json({ error: "Missing required query parameters" });
    }

    const start = new Date(startTime);
    if (isNaN(start.getTime())) {
      return res.status(400).json({ error: "Invalid startTime format" });
    }

    // Step 1: Calculate ride duration (simplified logic)
    const estimatedRideDurationHours =
      Math.abs(parseInt(toPincode) - parseInt(fromPincode)) % 24;

    // Step 2: Calculate end time
    const end = new Date(start.getTime() + estimatedRideDurationHours * 60 * 60 * 1000);

    // Step 3: Get vehicles with required capacity
    const candidateVehicles = await Vehicle.find({
      capacityKg: { $gte: parseInt(capacityRequired) },
    });

    // Step 4: Filter out vehicles with overlapping bookings
    const availableVehicles = [];
    for (const vehicle of candidateVehicles) {
      const overlappingBooking = await Booking.findOne({
        vehicleId: vehicle._id,
        $or: [{ startTime: { $lt: end }, endTime: { $gt: start } }],
      });

      if (!overlappingBooking) {
        availableVehicles.push(vehicle);
      }
    }

    res.status(200).json({
      estimatedRideDurationHours,
      availableVehicles,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};