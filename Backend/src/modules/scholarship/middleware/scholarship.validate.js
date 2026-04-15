import { AppError } from "../../../utils/AppError.js";

const VALID_CATEGORIES = ["Merit", "Need", "Sports", "Research", "Other"];
const VALID_DEGREES = ["Undergraduate", "Postgraduate", "PhD", "Diploma", "Other"];
const VALID_STATUSES = ["Applied", "Under Review", "Accepted", "Rejected"];

export function validateCreateScholarship(req, _res, next) {
  const { name, provider, amount, deadline, category, gpaRequirement, degreeLevel, description } = req.body;

  if (!name || name.length < 3) return next(new AppError("Name must be at least 3 characters", 400));
  if (!provider) return next(new AppError("Provider is required", 400));
  if (amount === undefined || amount < 0) return next(new AppError("Valid amount is required", 400));
  if (!deadline || isNaN(Date.parse(deadline))) return next(new AppError("Valid deadline is required", 400));
  if (new Date(deadline) < new Date()) return next(new AppError("Deadline must be in the future", 400));
  if (!category || !VALID_CATEGORIES.includes(category)) {
    return next(new AppError(`Category must be one of: ${VALID_CATEGORIES.join(", ")}`, 400));
  }
  if (gpaRequirement === undefined || gpaRequirement < 0 || gpaRequirement > 10) {
    return next(new AppError("GPA requirement must be between 0 and 10", 400));
  }
  if (!degreeLevel || !VALID_DEGREES.includes(degreeLevel)) {
    return next(new AppError(`Degree level must be one of: ${VALID_DEGREES.join(", ")}`, 400));
  }
  if (!description || description.length < 20) {
    return next(new AppError("Description must be at least 20 characters", 400));
  }

  next();
}

export function validateApply(req, _res, next) {
  const { scholarshipId } = req.body;
  if (!scholarshipId) return next(new AppError("scholarshipId is required", 400));
  next();
}

export function validateStatusUpdate(req, _res, next) {
  const { status } = req.body;
  if (!status || !VALID_STATUSES.includes(status)) {
    return next(new AppError(`Status must be one of: ${VALID_STATUSES.join(", ")}`, 400));
  }
  next();
}


export function validateUpdateScholarship(req, _res, next) {
  if (!req.body || typeof req.body !== "object") {
    return next(new AppError("Request body is required", 400));
  }

  const {
    name,
    provider,
    amount,
    deadline,
    category,
    gpaRequirement,
    degreeLevel,
    description,
    officialUrl,
  } = req.body;

  if (name !== undefined && name.trim().length < 3) {
    return next(new AppError("Name must be at least 3 characters", 400));
  }

  if (provider !== undefined && !provider.trim()) {
    return next(new AppError("Provider cannot be empty", 400));
  }

  if (amount !== undefined && amount < 0) {
    return next(new AppError("Amount must be a positive number", 400));
  }

  if (deadline !== undefined) {
    if (isNaN(Date.parse(deadline))) {
      return next(new AppError("Invalid deadline", 400));
    }
    if (new Date(deadline) < new Date()) {
      return next(new AppError("Deadline must be in the future", 400));
    }
  }

  if (category !== undefined && !VALID_CATEGORIES.includes(category)) {
    return next(
      new AppError(`Category must be one of: ${VALID_CATEGORIES.join(", ")}`, 400)
    );
  }

  if (
    gpaRequirement !== undefined &&
    (gpaRequirement < 0 || gpaRequirement > 10)
  ) {
    return next(new AppError("GPA must be between 0 and 10", 400));
  }

  if (
    degreeLevel !== undefined &&
    !VALID_DEGREES.includes(degreeLevel)
  ) {
    return next(
      new AppError(`Degree level must be one of: ${VALID_DEGREES.join(", ")}`, 400)
    );
  }

  if (description !== undefined && description.trim().length < 20) {
    return next(
      new AppError("Description must be at least 20 characters", 400)
    );
  }

  if (
    officialUrl !== undefined &&
    officialUrl !== "" &&
    !/^https?:\/\/.+/.test(officialUrl)
  ) {
    return next(new AppError("Invalid URL", 400));
  }

  next();
}