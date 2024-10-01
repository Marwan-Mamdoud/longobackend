import mongoose from "mongoose";

const Schema = mongoose.Schema({
  userId: { type: String },
  userName: { type: String },
  userImage: { type: String },
  activeCourseId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Courses",
  },
  hearts: { type: Number },
  points: { type: Number },
});

const UserProgress = mongoose.model("User_progress", Schema);
export default UserProgress;
