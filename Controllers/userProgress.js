import UserProgress from "../Models/userProgress.js";

export const createUserProgress = async (req, res, next) => {
  try {
    const { userId, userName, userImage, activeCourseId, hearts, points } =
      req.body;

    const userProgress = await new UserProgress({
      userId,
      userName,
      userImage,
      activeCourseId,
      hearts,
      points,
    });

    if (!userProgress) throw new Error("Cant create userProgress");

    const Userprogress = await userProgress.save();

    return res.status(201).json({
      message: "Done create userProgress Successfully",
      userProgress: Userprogress,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: `Error Controller create userProgress: ${error.message}`,
    });
  }
};

export const gettest = async (req, res, next) => {
  try {
    return res.status(200).json({ message: "Doneeeee" });
  } catch (error) {
    console.log(error);
  }
};

export const getUsersProgress = async (req, res, next) => {
  try {
    const usersProgress = await UserProgress.find().sort({ points: -1 });
    if (!usersProgress) throw new Error("Cant get users progress");
    return res.status(200).json({
      message: "Done get users progress",
      usersProgees: usersProgress,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ error: `Error get users progress: ${error.message}` });
  }
};

export const getUserProgressById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    let userProgress = await UserProgress.findOne({ userId: userId }).populate(
      "activeCourseId"
    );

    if (!userProgress) {
      userProgress = null;
    }
    return res
      .status(200)
      .json({ message: "Done get userProgress", userProgress });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error get userProgress controller : ${error.message}` });
  }
};

export const updateUserProgress = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const userProgress = await UserProgress.findOne({ userId: userId });

    if (!userProgress) throw new Error("Cant get userProgress");

    userProgress.userName = req.body.userName || userProgress.userName;
    userProgress.userImage = req.body.userImage || userProgress.userImage;
    userProgress.activeCourseId =
      req.body.activeCourseId || userProgress.activeCourseId;
    userProgress.hearts = req.body.hearts;
    userProgress.points =
      userProgress.points - req.body.points || userProgress.points;

    await userProgress.save();

    return res.status(201).json({
      message: "Done update userProgress",
      userProgress: userProgress,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: `Error update userProgress controller: ${error.message}`,
    });
  }
};
