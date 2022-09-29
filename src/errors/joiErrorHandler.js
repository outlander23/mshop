const joiErrorHandler = (data, dataSchema) => {
  const errors = {};
  const { error, value } = dataSchema.validate(data, {
    abortEarly: false,
  });
  if (error)
    error.details.forEach((item) => (errors[item.path[0]] = item.message));
  if (Object.keys(errors).length) return errors;
  return false;
};
export default joiErrorHandler;
