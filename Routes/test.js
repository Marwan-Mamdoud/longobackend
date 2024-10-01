import { Router } from "express";
import { addTest } from "../Controllers/test.js";

const router = Router();

router.post("/test", addTest);

export default router;
