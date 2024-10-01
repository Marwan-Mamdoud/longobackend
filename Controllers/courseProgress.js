import {
  ChallengeProgress,
  Challenges,
  Lessons,
  Units,
} from "../Models/Models.js";
import UserProgress from "../Models/userProgress.js";

export const getUnitCourse = async (req, res, next) => {
  try {
    const { UnitId } = req.params;
    const lessons = await Lessons.find({ unitId: UnitId }).populate(
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
    const firstUncompletedLesson = lessonss.find((lesson) => !lesson.completed);

    return res.status(201).json({
      message: "Done get course progress",
      activeLessonId: firstUncompletedLesson._id,
      activeLesson: firstUncompletedLesson,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      error: `Error get course progress controller : ${error.message}`,
    });
  }
};

export const upsertChallengeProgress = async (req, res, next) => {
  try {
    let challengeProgress;
    let userProgress;
    let challenge;
    const { challengeId, userId } = req.params;

    userProgress = await UserProgress.findOne({
      userId: userId,
    }).populate("activeCourseId");

    challenge = await Challenges.findById(challengeId);

    const lessonId = challenge.lessonId;
    challengeProgress = await ChallengeProgress.find({
      userId: userId,
      challengeId: challengeId,
    });

    const isPrctice = !!challengeProgress;

    if (isPrctice) {
      challengeProgress = await new ChallengeProgress({
        userId: userId,
        challengeId: challengeId,
        completed: true,
      });

      if (!challengeProgress) throw new Error("Cant create challenge progress");

      await challengeProgress.save();

      challenge.ChallengeProgress = challengeProgress;
      challenge.completed = true;
      await challenge.save();

      userProgress = await UserProgress.findByIdAndUpdate(userProgress._id, {
        hearts: Math.min(userProgress.hearts + 1, 25),
        points: userProgress.points + 10,
      });
    }

    challengeProgress = await new ChallengeProgress({
      userId: userId,
      challengeId: challengeId,
      completed: true,
    });

    challenge.ChallengeProgress = challengeProgress;
    challenge.completed = true;
    await challenge.save();

    userProgress = await UserProgress.findByIdAndUpdate(userProgress._id, {
      hearts: Math.min(userProgress.hearts + 1, 25),
      points: userProgress.points + 10,
    });

    return res.status(201).json({
      message: "Done upsert challenge progress",
      challengeProgress,
      userProgress,
      lessonId,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error upsert challenge progress: ${error.message}` });
  }
};

export const reduceHearts = async (req, res, next) => {
  try {
    let challengeProgress;
    let userProgress;
    let challenge;
    const { challengeId, userId } = req.params;

    userProgress = await UserProgress.findOne({
      userId: userId,
    }).populate("activeCourseId");

    challenge = await Challenges.findById(challengeId);

    const lessonId = challenge.lessonId;

    challengeProgress = await ChallengeProgress.findOne({
      userId: userId,
      challengeId: challengeId,
    });

    const isPrctice = !!challengeProgress;

    if (isPrctice) {
      return res.status(200).json({ error: "practice" });
    }

    userProgress = await UserProgress.findByIdAndUpdate(userProgress._id, {
      hearts: Math.max(userProgress.hearts - 1, 0),
    });

    return res.status(201).json({
      message: "Done reduce heart",
      challengeProgress,
      userProgress,
      lessonId,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ error: `Error reduce heart: ${error.message} ` });
  }
};
