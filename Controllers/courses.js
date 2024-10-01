import { Courses } from "../Models/Models.js";

export const CreateCourse = async (req, res, next) => {
  try {
    const { title, image } = req.body;
    if (!title) throw new Error("Title is required");
    if (!image) throw new Error("Image is required");
    const course = await new Courses({ title, image });
    if (course) await course.save();
    return res
      .status(201)
      .json({ message: "Done create course successfully", course });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error Create Course Countroller",
      error: error.message,
    });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Courses.find();
    if (!courses) throw new Error("Cant find courses");
    return res
      .status(200)
      .json({ messsage: "Done get courses successfully", courses });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "Error get courses controller",
      errorr: { error },
      error: error.message,
    });
  }
};
export const getCourse = async (req, res, next) => {
  try {
    const course = await Courses.findById(req.params.id);
    if (!course) throw new Error("Cant find courses");
    return res
      .status(200)
      .json({ messsage: "Done get courses successfully", course });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ message: "Error get courses controller", error: error.message });
  }
};
