import { Router } from "express";
import {
  createUserProgress,
  gettest,
  getUserProgressById,
  getUsersProgress,
  updateUserProgress,
} from "../Controllers/userProgress.js";
import {
  getUnitCourse,
  reduceHearts,
  upsertChallengeProgress,
} from "../Controllers/courseProgress.js";
import {
  createUserSubscription,
  getUserSubscription,
} from "../Controllers/userSubscription.js";

const router = Router();

router.get("/get-userProgress/:userId", getUserProgressById);

router.get("/get-unit-progress/:UnitId", getUnitCourse);

router.get("/get-test", gettest);

router.get("/get-users-progress", getUsersProgress);

router.post("/create-userProgress", createUserProgress);

router.put("/update-userProgress/:userId", updateUserProgress);

router.post(
  "/upsert-challenge-progress/:userId/:challengeId",
  upsertChallengeProgress
);

router.post("/reduce-heart/:userId/:challengeId", reduceHearts);

router.get("/get-user-subscription/:userId", getUserSubscription);

router.post("/create-user-subscription", createUserSubscription);

export default router;
