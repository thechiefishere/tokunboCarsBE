const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res);
    } catch (error) {
      error.status = 500;
      error.msg = "There was an error with the server";
      next(error);
    }
  };
};

module.exports = asyncWrapper;
