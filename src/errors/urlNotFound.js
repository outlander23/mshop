import AppError from "../utils/appError.js";

const urlNotFound = (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
};

export default urlNotFound;
