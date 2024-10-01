import { Router } from "express";
import { CreateCourse, getCourse, getCourses } from "../Controllers/courses.js";

const router = Router();

router.post("/create-course", CreateCourse);

router.get("/get-all-courses", getCourses);

router.get("/get-course/:id", getCourse);

export default router;
