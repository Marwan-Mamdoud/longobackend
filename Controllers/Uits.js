import { Courses, Units } from "../Models/Models.js";

export const createUnit = async (req, res, next) => {
  try {
    const { title, description, order, courseId } = req.body;
    const unit = await new Units({ title, description, order, courseId });
    if (!unit) throw new Error("Cant create unit");
    await unit.save();
    const course = await Courses.findById(courseId);
    course.units.push(unit._id);
    await course.save();
    return res.status(201).json({ message: "Done create unit", unit });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

export const deleteUnit = async (req, res, next) => {
  try {
    const { unitId } = req.params;
    const data = await Units.findByIdAndDelete(unitId);
    return res.status(200).json({ message: "Done Delete Unit" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

export const getUnits = async (req, res, next) => {
  try {
    const units = await Units.find({ courseId: req.params.id });
    if (!units) throw new Error("Cant get units");
    return res.status(200).json({ message: "Done get units", units });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: `Error get units: ${error.message}` });
  }
};
