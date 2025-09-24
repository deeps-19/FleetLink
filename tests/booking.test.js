import request from "supertest";
import app from "../Server.js";
import Vehicle from "../models/Vehicle.js";
import Booking from "../models/Booking.js";

describe("POST /api/bookings", () => {
  let vehicle;

  beforeEach(async () => {
    await Vehicle.deleteMany();
    await Booking.deleteMany();

    vehicle = await Vehicle.create({ numberPlate: "MH20ZZ1122", capacityKg: 800 });
  });

  test("should create booking successfully", async () => {
    const res = await request(app).post("/api/bookings").send({
      vehicleId: vehicle._id,
      fromPincode: "500001",
      toPincode: "500010",
      startTime: "2025-09-26T09:00:00Z",
      customerId: "CUST001"
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.vehicleId).toBe(vehicle._id.toString());
  });

  test("should return 409 if booking overlaps", async () => {
    await Booking.create({
      vehicleId: vehicle._id,
      fromPincode: "500001",
      toPincode: "500005",
      startTime: new Date("2025-09-26T09:00:00Z"),
      endTime: new Date("2025-09-26T11:00:00Z"),
    });

    const res = await request(app).post("/api/bookings").send({
      vehicleId: vehicle._id,
      fromPincode: "500002",
      toPincode: "500020",
      startTime: "2025-09-26T10:00:00Z", // overlaps
      customerId: "CUST002"
    });

    expect(res.statusCode).toBe(409);
    expect(res.body.error).toBe("Vehicle already booked for this time range");
  });
});
