const Car = require("../models/carSchema");
const { BadRequestError } = require("../errors");

const getAllCars = async (req, res, next) => {
  const cars = await Car.find({});
  res.status(200).json({ status: "success", cars });
};

const postCar = async (req, res, next) => {
  const car = await Car.create(req.body);
  res.status(200).json({ status: "success", car });
};

const deleteAllCars = async (req, res, next) => {
  await Car.deleteMany({});
  res.status(200).json({ status: "success", msg: "Deleted" });
};

const getSingleCar = async (req, res, next) => {
  const { carId } = req.params;
  const car = await Car.findById(carId);
  if (!car) {
    throw new BadRequestError("Car does not exist");
  }
  res.status(200).json({ status: "success", car });
};

const updateCar = async (req, res, next) => {
  const { carId } = req.params;

  const car = await Car.findByIdAndUpdate(carId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!car) {
    throw new BadRequestError("Car does not exist");
  }
  res.status(200).json({ status: "success", car });
};

const deleteCar = async (req, res, next) => {
  const { carId } = req.params;

  const car = await Car.findByIdAndDelete(carId);
  if (!car) {
    throw new BadRequestError("Car does not exist");
  }
  res.status(200).json({ status: "success", msg: "Deleted" });
};

module.exports = {
  getAllCars,
  postCar,
  deleteAllCars,
  getSingleCar,
  updateCar,
  deleteCar,
};
