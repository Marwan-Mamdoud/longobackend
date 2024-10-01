import mongoose from "mongoose";
import {
  ChallangeOptions,
  ChallengeProgress,
  Challenges,
  Lessons,
  Units,
} from "../Models/Models.js";

// ================================= LESSONS ========================================

export const createLesson = async (req, res, next) => {
  try {
    const { title, unitId, order } = req.body;
    const lesson = await new Lessons({ title, unitId, order });
    if (!lesson) throw new Error("Cant create lesson");
    await lesson.save();
    const unit = await Units.findById(unitId);
    unit.lessons.push(lesson._id);
    await unit.save();
    return res
      .status(201)
      .json({ message: "Done create lesson successfully.", lesson });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error create lesson controller ${error.message} ` });
  }
};

export const deleteLesson = async (req, res, next) => {
  try {
    const data = await Lessons.findByIdAndDelete(req.params.id);
    if (data) res.status(200).json({ message: "Done Deleta Lesson" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

export const getUnitLessonswithStatus = async (req, res, next) => {
  try {
    const lessons = await Lessons.find({ unitId: req.params.id }).populate(
      "challenges"
    );
    if (!lessons) throw new Error("Cant get lessons");
    const lessonss = lessons.map((lesson) => {
      const completed =
        lesson.challenges &&
        lesson.challenges.length > 0 &&
        lesson.challenges.every((challenge) => challenge.completed) &&
        lesson.challenges.every((challenge) => challenge.ChallengeProgress);
      lesson.completed = completed;
      return lesson;
    });
    return res.status(200).json({ message: "Done get unit lessons", lessonss });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error get lesson with status: ${error.status}` });
  }
};

export const getLesson = async (req, res, next) => {
  try {
    const lesson = await Lessons.findById(req.params.id).populate("challenges");
    if (!lesson) throw new Error("Cant get challenge");

    console.log(lesson);

    const completed = lesson.challenges.every(
      (challenge) => challenge.ChallengeProgress
    );

    lesson.completed = completed ? true : false;
    await lesson.save();
    return res.status(200).json({ message: "done get lesson", lesson });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error get lesson controller: ${error.message}` });
  }
};

// ===================================== CHALLENGES =======================================

export const createChallenge = async (req, res, next) => {
  try {
    const { lessonId, type, question, order } = req.body;
    const challenge = await new Challenges({ lessonId, type, question, order });
    if (!challenge) throw new Error("Cant create challenge");
    await challenge.save();
    const lesson = await Lessons.findById(lessonId);
    lesson.challenges.push(challenge._id);
    await lesson.save();
    return res
      .status(201)
      .json({ message: "Done create challenge", challenge });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error create challenge controller: ${error.message}` });
  }
};

export const getChallenges = async (req, res, next) => {
  try {
    const { id } = req.params;
    let challenges = await Challenges.find({ lessonId: id }).populate(
      "challengeOptions"
    );
    challenges = challenges.map((challenge) => {
      const completed =
        challenge.ChallengeProgress && challenge.ChallengeProgress.completed;
      return { completed, ...challenge._doc };
    });
    return res.status(200).json(challenges);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: `Error get challenges: ${error.message}` });
  }
};

export const deleteChallenge = async (req, res, next) => {
  try {
    const challenge = await Challenges.findById(req.params.id);
    const lesson = await Lessons.findById(challenge.lessonId);
    const data = await Challenges.findByIdAndDelete(req.params.id);

    const challenges = lesson.challenges;
    const challengeUpdated = challenges.filter((ch) => {
      return ch._id.toString() !== req.params.id;
    });
    console.log(challengeUpdated);
    lesson.challenges = challengeUpdated;
    await lesson.save();
    if (data) return res.status(200).json({ message: "Done Delete Challenge" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: `Error get challenges: ${error.message}` });
  }
};

export const updatae = async (req, res, next) => {
  try {
    const challenge = await Challenges.findById(req.params.id);
    if (!challenge) throw new Error("Cant get challenge");
    challenge.ChallengeProgress = {
      userId: req.body.userId,
      challengeId: req.body.challengeId,
      completed: req.body.completed,
      _id: req.body._id,
    };
    challenge.ChallengeProgress = {
      userId: "user_2lsYNGOapdNgFH5wrk9KlE0qftZ",
      challengeId: "66ed5b78ba4208b34e2a7ee8",
      completed: true,
      _id: "66ed5c67ba4208b34e2a7f3b",
      __v: 0,
    };
    challenge.completed = true;
    await challenge.save();
    return res
      .status(200)
      .json({ message: "Done Update challenge", challenge });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: `Error create option : ${error.message}` });
  }
};

export const getChallenge = async (req, res, next) => {
  try {
    const challenge = await Challenges.findById(req.params.id);
    if (!challenge) throw new Error("Cant get challenge");
    return res.status(200).json({ message: "Done Get challenge", challenge });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: `Error get challenge: ${error.message}` });
  }
};

// ======================================== OPTIONS ==============================================

export const createOption = async (req, res, next) => {
  try {
    const { challengeId, text, correct, imageSrc, audioSrc } = req.body;
    const option = await new ChallangeOptions({
      challengeId,
      text,
      correct,
      imageSrc,
      audioSrc,
    });
    if (!option) throw new Error("Cant crate option");
    await option.save();
    const challenge = await Challenges.findById(challengeId);
    challenge.challengeOptions.push(option);
    await challenge.save();
    return res
      .status(201)
      .json({ message: "Done create challenge option ", option });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: `Error create option : ${error.message}` });
  }
};

export const deleteOption = async (req, res, next) => {
  try {
    const challengeOption = await ChallangeOptions.findById(req.params.id);
    const challenge = await Challenges.findById(challengeOption.challengeId);
    const data = await ChallangeOptions.findByIdAndDelete(req.params.id);

    const challengeOptions = challenge.challengeOptions;
    const challengeUpdated = challengeOptions.filter((ch) => {
      return ch._id.toString() !== req.params.id;
    });
    challenge.challengeOptions = challengeUpdated;
    await challenge.save();
    if (data) return res.status(200).json({ message: "Done Delete Challenge" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: `Error get challenges: ${error.message}` });
  }
};

// ============================================= CHALLENGE PROGRESS ==========================================

export const getCahllengeProgress = async (req, res, next) => {
  try {
    const challengeProgress = await ChallengeProgress.find({
      userId: req.params.userId,
      challengeId: req.params.challengeId,
    });
    if (!challengeProgress || challengeProgress.length === 0)
      throw new Error("Cant get challenge progress");
    return res
      .status(200)
      .json({ message: "Done get challenge progress", challengeProgress });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error get challenge progress: ${error.message}` });
  }
};

export const createChallengeProgress = async (req, res, next) => {
  try {
    const challengeProgress = await new ChallengeProgress({
      userId: req.body.userId,
      challengeId: req.body.challengeId,
      completed: req.body.completed,
    });
    if (!challengeProgress) throw new Error("Cant create challenge progress");
    await challengeProgress.save();
    console.log(challengeProgress);

    const challenge = await Challenges.findById(req.body.challengeId);
    challenge.ChallengeProgress = challengeProgress;
    challenge.completed = true;
    await challenge.save();
    return res
      .status(201)
      .json({ message: "Done create challenge progress", challengeProgress });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: `Error create challenge progress: ${error.message}`,
    });
  }
};

export const updateChallengeProgress = async (req, res, next) => {
  try {
    const challengeProgress = await ChallengeProgress.findOneAndUpdate(
      { userId: req.params.userId, challengeId: req.params.challengeId },
      { completed: true }
    );
    if (!challengeProgress)
      throw new Error("Cant find challenge progress and update it");

    return res.status(201).json({
      message: "Done get challenge progress and update it.",
      challengeProgress,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error updata challenge progress: ${error.message}` });
  }
};
