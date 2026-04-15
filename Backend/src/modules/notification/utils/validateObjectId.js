import mongoose from "mongoose";
import { ApiError } from "../../../utils/apiError.js";

export const validateObjectId = (locations = "params", ...fields) => {
  return (req, _res, next) => {
    const sources = {
      params: req.params,
      body: req.body,
      query: req.query,
    };

    const source = sources[locations];

    if (!source) {
      return next(new ApiError(400, `Invalid validation source: ${locations}`));
    }

    for (const field of fields) {
      const value = source[field];

      if (!value || !mongoose.Types.ObjectId.isValid(value)) {
        return next(
          new ApiError(400, `Invalid ObjectId for ${locations}.${field}`)
        );
      }
    }

    next();
  };
};