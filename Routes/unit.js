import { Router } from "express";
import { createUnit, deleteUnit, getUnits } from "../Controllers/Uits.js";

const router = Router();

router.post("/create-unit", createUnit);

router.delete("/delete-unit/:unitId", deleteUnit);

router.get("/get-units/:id", getUnits);

export default router;
