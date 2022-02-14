const express = require("express");
const carsRoute = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/auth");

const {
  getAllCars,
  postCar,
  deleteAllCars,
  getSingleCar,
  updateCar,
  deleteCar,
} = require("../controllers/carsController");

carsRoute
  .route("/")
  .get(getAllCars)
  .post(authMiddleware, adminMiddleware, postCar)
  .delete(authMiddleware, adminMiddleware, deleteAllCars);

carsRoute
  .route("/:carId")
  .get(getSingleCar)
  .patch(authMiddleware, adminMiddleware, updateCar)
  .delete(authMiddleware, adminMiddleware, deleteCar);

module.exports = carsRoute;
