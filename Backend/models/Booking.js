import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
  customerId: { type: String, required: true }, // Can be ObjectId if you have a User model
  fromPincode: { type: String, required: true },
  toPincode: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
