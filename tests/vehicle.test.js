import request from "supertest";
import app from "../Server.js"; // ensure you export app in server.js
import Vehicle from "../models/Vehicle.js";

describe("Vehicle API", () => {
  beforeEach(async () => {
    await Vehicle.deleteMany();
  });

  test("POST /api/vehicles → should create vehicle", async () => {
    const res = await request(app).post("/api/vehicles").send({
      numberPlate: "MH12AB1234",
      capacityKg: 1000,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.numberPlate).toBe("MH12AB1234");
  });
});
