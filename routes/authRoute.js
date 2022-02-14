const express = require("express");
const authRoute = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/auth");

const {
  getAllUsers,
  deleteAllUsers,
  deleteSingleUser,
  getSingleUser,
  updateUser,
  updateCart,
  updatePendingCars,
  updateDeliveredCars,
  removeFromCart,
  signUp,
  logIn,
  logOut,
} = require("../controllers/authController");

authRoute
  .route("/users")
  .get(authMiddleware, adminMiddleware, getAllUsers)
  .delete(authMiddleware, adminMiddleware, deleteAllUsers);
authRoute
  .route("/user")
  .get(authMiddleware, getSingleUser)
  .patch(authMiddleware, updateUser);
authRoute
  .route("/user/cart")
  .patch(authMiddleware, updateCart)
  .delete(authMiddleware, removeFromCart);
authRoute.route("/user/pending-cars").patch(authMiddleware, updatePendingCars);
authRoute
  .route("/user/delivered-cars")
  .patch(authMiddleware, updateDeliveredCars);
authRoute
  .route("/users/:userId")
  .delete(authMiddleware, adminMiddleware, deleteSingleUser);
authRoute.route("/register").post(signUp);
authRoute.route("/login").post(logIn);
authRoute.route("/logout").delete(authMiddleware, logOut);

module.exports = authRoute;
