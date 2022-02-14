const User = require("../models/userSchema");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../errors");
const Token = require("../models/token-schema");

const getAllUsers = async (req, res) => {
  const users = await User.find({})
    .populate("carsInCart")
    .populate("pendingCars")
    .populate("deliveredCars");
  res.status(200).json({ status: "success", users });
};

const getSingleUser = async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id)
    .populate("carsInCart")
    .populate("pendingCars")
    .populate("deliveredCars");
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const userDetails = {
    firstName: user.firstName,
    lastName: user.lastName,
    deliveredCars: user.deliveredCars,
    pendingCars: user.pendingCars,
    carsInCart: user.carsInCart,
  };

  res.status(200).json({ status: "success", userDetails });
};

const updateUser = async (req, res) => {
  const { id } = req.user;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new NotFoundError("User Not Found");
  }

  const populatedUser = await User.findById(id).populate("carsInCart");

  const userDetails = {
    firstName: populatedUser.firstName,
    lastName: populatedUser.lastName,
    deliveredCars: populatedUser.deliveredCars,
    pendingCars: populatedUser.pendingCars,
    carsInCart: populatedUser.carsInCart,
  };

  res.status(200).json({ status: "success", userDetails });
};

const updateCart = async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError("User Not Found");
  }
  for (let i = 0; i < req.body.carsInCart.length; i++) {
    let isPresent = false;
    const carId = req.body.carsInCart[i];
    for (let j = 0; j < user.carsInCart.length; j++) {
      const userCarId = user.carsInCart[j]._id.toString();
      if (userCarId == carId) {
        isPresent = true;
        break;
      }
    }
    if (!isPresent) {
      user.carsInCart.push(carId);
    }
  }
  await user.save();
  const populatedUser = await User.findById(id)
    .populate("carsInCart")
    .populate("pendingCars")
    .populate("deliveredCars");

  const userDetails = {
    firstName: populatedUser.firstName,
    lastName: populatedUser.lastName,
    deliveredCars: populatedUser.deliveredCars,
    pendingCars: populatedUser.pendingCars,
    carsInCart: populatedUser.carsInCart,
  };

  res.status(200).json({ status: "success", userDetails });
};

const removeFromCart = async (req, res) => {
  const { id } = req.user;
  const { car } = req.body;
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError("User Not Found");
  }
  if (user.carsInCart.length > 0) {
    for (let i = 0; i < user.carsInCart.length; i++) {
      if (car == user.carsInCart[i]._id.toString()) {
        user.carsInCart.splice(i, 1);
        await user.save();
        break;
      }
    }
  }
  const populatedUser = await User.findById(id)
    .populate("carsInCart")
    .populate("pendingCars")
    .populate("deliveredCars");

  const userDetails = {
    firstName: populatedUser.firstName,
    lastName: populatedUser.lastName,
    deliveredCars: populatedUser.deliveredCars,
    pendingCars: populatedUser.pendingCars,
    carsInCart: populatedUser.carsInCart,
  };

  res.status(200).json({ status: "success", userDetails });
};

const updatePendingCars = async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError("User Not Found");
  }
  for (let i = 0; i < req.body.pendingCars.length; i++) {
    let isPresent = false;
    const carId = req.body.pendingCars[i];
    for (let j = 0; j < user.pendingCars.length; j++) {
      const userCarId = user.pendingCars[j]._id.toString();
      if (userCarId == carId) {
        isPresent = true;
        break;
      }
    }
    if (!isPresent) {
      user.carsInCart = [];
      user.pendingCars.push(carId);
    }
  }
  await user.save();
  const populatedUser = await User.findById(id)
    .populate("carsInCart")
    .populate("pendingCars")
    .populate("deliveredCars");

  const userDetails = {
    firstName: populatedUser.firstName,
    lastName: populatedUser.lastName,
    deliveredCars: populatedUser.deliveredCars,
    pendingCars: populatedUser.pendingCars,
    carsInCart: populatedUser.carsInCart,
  };

  res.status(200).json({ status: "success", userDetails });
};

const updateDeliveredCars = async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError("User Not Found");
  }
  for (let i = 0; i < req.body.deliveredCars.length; i++) {
    let isPresent = false;
    const carId = req.body.deliveredCars[i];
    for (let j = 0; j < user.deliveredCars.length; j++) {
      const userCarId = user.deliveredCars[j]._id.toString();
      if (userCarId == carId) {
        isPresent = true;
        break;
      }
    }
    if (!isPresent) {
      user.deliveredCars.push(carId);
    }
  }
  await user.save();
  const populatedUser = await User.findById(id)
    .populate("carsInCart")
    .populate("pendingCars")
    .populate("deliveredCars");

  const userDetails = {
    firstName: populatedUser.firstName,
    lastName: populatedUser.lastName,
    deliveredCars: populatedUser.deliveredCars,
    pendingCars: populatedUser.pendingCars,
    carsInCart: populatedUser.carsInCart,
  };

  res.status(200).json({ status: "success", userDetails });
};

const deleteAllUsers = async (req, res) => {
  await User.deleteMany({});
  res.status(200).json({ status: "success", msg: "Users deleted" });
};

const deleteSingleUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOneAndDelete({ _id: userId });
  if (!user) {
    throw new NotFoundError(`user with id ${userId} does not exist`);
  }

  res.status(200).json({ status: "success", msg: "User deleted" });
};

const signUp = async (req, res, next) => {
  const user = await User.create(req.body);
  const token = user.createJWT();
  const tokenToAdd = {
    token: token,
    signedAt: Date.now(),
  };

  await Token.create(tokenToAdd);
  updateTokens();
  const userDetails = {
    firstName: user.firstName,
    lastName: user.lastName,
    deliveredCars: user.deliveredCars,
    pendingCars: user.pendingCars,
    carsInCart: user.carsInCart,
  };
  res.status(200).json({ status: "success", token, userDetails });
};

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Information not provided");
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new UnauthorizedError("Invalid Credentials here");
  }

  const match = await user.comparePassword(password);
  if (!match) {
    throw new UnauthorizedError("Invalid Credentials or here");
  }

  const token = user.createJWT();
  const tokenToAdd = {
    token: token,
    signedAt: Date.now(),
  };
  await Token.create(tokenToAdd);
  updateTokens();
  const populatedUser = await User.findById(user._id)
    .populate("carsInCart")
    .populate("pendingCars")
    .populate("deliveredCars");
  const userDetails = {
    firstName: populatedUser.firstName,
    lastName: populatedUser.lastName,
    deliveredCars: populatedUser.deliveredCars,
    pendingCars: populatedUser.pendingCars,
    carsInCart: populatedUser.carsInCart,
  };
  res.status(200).json({ status: "success", token, userDetails });
};

const logOut = async (req, res) => {
  const { token } = req.user;
  console.log("token is ", token);
  await Token.findOneAndDelete({ token: token });
  res
    .status(200)
    .json({ status: "success", msg: "You have succesfully loged out" });
};

const updateTokens = async () => {
  const tokens = await Token.find({});
  const updatedTokens = tokens.filter((token) => {
    const timeDiff = (Date.now() - token.signedAt) / 1000;
    if (timeDiff >= 2592000) {
      return token;
    }
  });
  for (let i = 0; i < updatedTokens.length; i++) {
    const token = updatedTokens[i];
    await Token.deleteOne(token._id);
  }
};

module.exports = {
  getAllUsers,
  deleteAllUsers,
  deleteSingleUser,
  signUp,
  logIn,
  logOut,
  getSingleUser,
  updateUser,
  updateCart,
  updatePendingCars,
  updateDeliveredCars,
  removeFromCart,
};
