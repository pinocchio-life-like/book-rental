const handleErrors = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "An unexpected error occurred.",
    },
  });
};

module.exports = { handleErrors };
