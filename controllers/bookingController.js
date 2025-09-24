import Vehicle from "../models/Vehicle.js";
import Booking from "../models/Booking.js";

// @desc Book a vehicle
// @route POST /api/bookings
// @access Public
export const createBooking = async (req, res) => {
  try {
    const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body;

    // Validation
    if (!vehicleId || !fromPincode || !toPincode || !startTime || !customerId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Verify vehicle exists
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    // Ride duration (simplified placeholder logic)
    const estimatedRideDurationHours =
      Math.abs(parseInt(toPincode) - parseInt(fromPincode)) % 24;

    const start = new Date(startTime);
    if (isNaN(start.getTime())) {
      return res.status(400).json({ error: "Invalid startTime format" });
    }

    const end = new Date(start.getTime() + estimatedRideDurationHours * 60 * 60 * 1000);

    // Re-verify availability to prevent race conditions
    const conflictingBooking = await Booking.findOne({
      vehicleId,
      $or: [{ startTime: { $lt: end }, endTime: { $gt: start } }],
    });

    if (conflictingBooking) {
      return res.status(409).json({ error: "Vehicle is already booked for this time slot" });
    }

    // Create booking
    const newBooking = new Booking({
      vehicleId,
      fromPincode,
      toPincode,
      startTime: start,
      endTime: end,
      customerId,
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({
      ...savedBooking.toObject(),
      estimatedRideDurationHours,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};
