import mongoose from "mongoose";

const Schema = mongoose.Schema({
  userId: { type: String },
  user: { type: String },
  active: { type: Boolean },
});

const UserSubscription = mongoose.model("User_Subscription", Schema);

export default UserSubscription;
