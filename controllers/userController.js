const User = require("../models/userModel");
const base = require("./baseController");
const helperMethods = require("../helpers/helperMethods");

deleteMe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      active: false,
    });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

me = async (req, res, next) => {
  try {
    let user = await User.findById(req.user.id);
    res.status(200).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (error) {
    next(error);
  }
};

getAllUsers = base.getAll(User);
getUser = base.getOne(User);

// Don't update password on this
updateUser = base.updateOne(User);
deleteUser = base.deleteOne(User);

module.exports = {
  deleteMe,
  me,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
