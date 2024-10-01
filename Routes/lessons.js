import { Router } from "express";
import {
  createChallenge,
  createChallengeProgress,
  createLesson,
  createOption,
  deleteChallenge,
  deleteLesson,
  deleteOption,
  getCahllengeProgress,
  getChallenge,
  getChallenges,
  getLesson,
  getUnitLessonswithStatus,
  updatae,
  updateChallengeProgress,
} from "../Controllers/Lessons.js";

const router = Router();

// LESSONS
router.post("/create-lesson", createLesson);

router.delete("/delete-lesson/:id", deleteLesson);

router.get("/get-unit-lessons/:id", getUnitLessonswithStatus);

router.get("/get-lesson/:id", getLesson);

// CHALLENGE
router.post("/create-challenge", createChallenge);

router.get("/get-challenges/:id", getChallenges);

router.delete("/delete-challenge/:id", deleteChallenge);

router.put("/updadat-challenge/:id", updatae);

router.get("/get-challenge/:id", getChallenge);

//CHALLENGE OPTIONS
router.post("/create-option", createOption);

router.delete("/delete-option/:id", deleteOption);

//CHALLENGE PROGRESS
router.get(
  "/get-challenge-progress/:userId/:challengeId",
  getCahllengeProgress
);

router.post("/create-challenge-progress", createChallengeProgress);

router.put(
  "/update-challenge-progress/:userid/:challengeId",
  updateChallengeProgress
);
export default router;
