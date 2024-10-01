import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
const PORT = 5000;

import TestRouter from "./Routes/test.js";
import CourseRouter from "./Routes/courses.js";
import UnitsRouter from "./Routes/unit.js";
import LessonRouter from "./Routes/lessons.js";
import UserProgressRouter from "./Routes/userprogress.js";

const app = express();

app.listen(PORT, () => {
  console.log("Done Connect Server");
  // getConnectToDatabase();
});

mongoose
  .connect(
    "mongodb+srv://maro:VBP1ACAwuEgEySEj@cluster0.3rhla.mongodb.net/Duolingo"
  )
  .then(() => console.log("Database is connected✌️"))
  .catch((error) => console.log(error));

const corsOptions = {
  origin: "https://lingo-silk-nine.vercel.app", // النطاق المسموح به
  credentials: true, // السماح بإرسال معلومات الاعتماد
};

app.use(cors(corsOptions));

// const getConnectToDatabase = async () => {
//   try {
//     await mongoose
//       .connect(
//         "mongodb+srv://maro:VBP1ACAwuEgEySEj@cluster0.3rhla.mongodb.net/Duolingo",
//         { useNewUrlParser: true, useUnifiedTopology: true }
//       )
//       // mongodb+srv://maro:VBP1ACAwuEgEySEj@cluster0.3rhla.mongodb.net/
//       .then((data) => {
//         if (data) console.log("Done Connect To Database");
//       });
//   } catch (error) {
//     console.error(`Error From Connect To Data: ` + error.message);
//     process.exit(1);
//   }
// };

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/api/unit/hi", (req, res) => {
  return res.json({ message: "hi" });
});
app.get("/api/unit", (req, res) => {
  return res.status(200).json({ message: "hi" });
});
app.use(TestRouter);
app.use(UnitsRouter);
app.use(LessonRouter);
app.use("/api/courses", CourseRouter);
app.use("/api/userProgress", UserProgressRouter);
