import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  name: String,
});

const Test = mongoose.model("Test", Schema);

export default Test;
