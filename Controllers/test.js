import Test from "../Models/test.js";

export const addTest = async (req, res, next) => {
  const { name } = req.body;
  const test = await new Test({ name });
  await test.save();
  res.status(201).json({ message: "Done Create Data", test });
};
