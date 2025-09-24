import express from "express";
import { addVehicle, getAvailableVehicles } from "../controllers/vehicleController.js";

const router = express.Router();

// Add new vehicle
router.post("/", addVehicle);

// Find available vehicles
router.get("/available", getAvailableVehicles);

export default router;
