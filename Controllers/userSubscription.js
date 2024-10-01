import UserSubscription from "../Models/userSubscription.js";

export const getUserSubscription = async (req, res, next) => {
  try {
    const usersubscription = await UserSubscription.findOne({
      userId: req.params.userId,
    });

    if (!usersubscription)
      return res.status(200).json({ userSubscription: null });
    return res.status(200).json({
      message: "Done get userSubscription",
      userSubscription: usersubscription,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error get user subscription: ${error.message}` });
  }
};

export const createUserSubscription = async (req, res, next) => {
  try {
    const userSubscription = await new UserSubscription({
      userId: req.body.userId,
      user: req.body.user,
      active: true,
    });
    if (!userSubscription) throw new Error("Cant create subscription");
    await userSubscription.save();
    return res
      .status(201)
      .json({ message: "Done create subscription", userSubscription });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error create user subscription: ${error.message}` });
  }
};
