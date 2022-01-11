const { CustomAPIError } = require("../errors/custom-errors");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }
  return res.status(500).json({
    success: false,
    message: `Something went wrong... Please try again`,
  });
};

module.exports = errorHandlerMiddleware;
