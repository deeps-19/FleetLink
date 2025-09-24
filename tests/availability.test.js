import request from "supertest";
import app from "../Server.js";
import Vehicle from "../models/Vehicle.js";
import Booking from "../models/Booking.js";

describe("GET /api/vehicles/available", () => {
  let vehicle;

  beforeEach(async () => {
    await Vehicle.deleteMany();
    await Booking.deleteMany();

    vehicle = await Vehicle.create({ numberPlate: "MH14XY7890", capacityKg: 1200 });
  });

  test("should return available vehicle if no booking conflict", async () => {
    const res = await request(app).get("/api/vehicles/available")
      .query({
        capacityRequired: 500,
        fromPincode: "400001",
        toPincode: "400010",
        startTime: "2025-09-25T10:00:00Z"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.vehicles.length).toBe(1);
    expect(res.body.vehicles[0]._id).toBe(vehicle._id.toString());
  });

  test("should exclude vehicle if overlapping booking exists", async () => {
    await Booking.create({
      vehicleId: vehicle._id,
      fromPincode: "400001",
      toPincode: "400005",
      startTime: new Date("2025-09-25T10:00:00Z"),
      endTime: new Date("2025-09-25T12:00:00Z"),
    });

    const res = await request(app).get("/api/vehicles/available")
      .query({
        capacityRequired: 500,
        fromPincode: "400002",
        toPincode: "400020",
        startTime: "2025-09-25T11:00:00Z" // overlaps!
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.vehicles.length).toBe(0);
  });
});
