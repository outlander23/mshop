export const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401)

export const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401)
