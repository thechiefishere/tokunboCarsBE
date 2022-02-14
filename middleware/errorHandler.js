const CustomAPIError = require("../errors/custom-errors");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    message: err.message || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  return res
    .status(customError.statusCode)
    .json({ status: "fail", msg: customError.message });
};

module.exports = errorHandler;
