import mongoose from "mongoose";

//========================================================================================
///========================================================================================
///========================================================================================

const units = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, required: true },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lessons" }],
});

export const Units = mongoose.model("Units", units);

///========================================================================================
///========================================================================================
///========================================================================================

const courses = mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  units: [{ type: mongoose.Schema.Types.ObjectId, ref: "Units" }],
});

export const Courses = mongoose.model("Courses", courses);

//========================================================================================
///========================================================================================
///========================================================================================

const lessons = mongoose.Schema({
  title: { type: String, required: true },
  unitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Units",
    required: true,
  },
  order: { type: Number, required: true },
  completed: { type: Boolean },
  challenges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Challenges" }],
});

export const Lessons = mongoose.model("Lessons", lessons);

//========================================================================================
///========================================================================================
///========================================================================================

const challenges = mongoose.Schema({
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Lessons",
  },
  type: { type: String, enum: ["SELECT", "ASSIST"], reqruired: true },
  question: { type: String, required: true },
  order: { type: Number, required: true },
  challengeOptions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Challenges_Options" },
  ],
  ChallengeProgress: { type: Object },
  completed: { type: Boolean },
});

export const Challenges = mongoose.model("Challenges", challenges);

//========================================================================================
///========================================================================================
///========================================================================================

const challengeOptions = mongoose.Schema({
  challengeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenges",
    required: true,
  },
  text: { type: String, required: true },
  correct: { type: Boolean, required: true },
  imageSrc: { type: String },
  audioSrc: { type: String },
});

export const ChallangeOptions = mongoose.model(
  "Challenges_Options",
  challengeOptions
);

//========================================================================================
///========================================================================================
///========================================================================================

const challengeProgress = mongoose.Schema({
  userId: { type: String, required: true },
  challengeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenges",
    required: true,
  },
  completed: { type: Boolean },
});

export const ChallengeProgress = mongoose.model(
  "Challenge_Progress",
  challengeProgress
);

//========================================================================================
///========================================================================================
///========================================================================================
