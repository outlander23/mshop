const handleValidationError = (res, errors) => {
  res.status(400).send({
    status: "fail",
    errors,
  });
};

export default handleValidationError;
