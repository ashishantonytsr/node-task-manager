class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message); //pass message to parent class <Error>
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
};

module.exports = { createCustomError, CustomAPIError };
