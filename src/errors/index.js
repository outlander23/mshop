import {
  handleAtlasErrorB,
  handleCastErrorDB,
  handleDuplicateFieldsDB,
  handleValidationErrorDB,
} from "./databaseErrors.js";
import urlNotFound from "./urlNotFound.js";
import { NODE_ENV } from "../utils/env.js";
import sendErrorDev from "./sendDevError.js";
import sendErrorProd from "./sendErrorProd.js";
import joiErrorHandler from "./joiErrorHandler.js";
import handleValidationError from "./validationError.js";
import { handleJWTError, handleJWTExpiredError } from "./jwtErrors.js";

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;
    if (error.codeName === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.codeName === "AtlasError") error = handleAtlasErrorB(error);
    if (error.codeName === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.codeName === "JsonWebTokenError") error = handleJWTError();
    if (error.codeName === "TokenExpiredError") error = handleJWTExpiredError();
    sendErrorProd(error, req, res);
  }
};

export {
  joiErrorHandler,
  globalErrorHandler,
  urlNotFound,
  handleValidationErrorDB,
  handleValidationError,
};
