import { ApiError } from "../../../utils/apiError.js";

export const validateBody = (schema) => (req, _res, next) => {
  const result = schema(req.body);
  if (result?.error) {
    return next(new ApiError(400, result.error));
  }
  next();
};