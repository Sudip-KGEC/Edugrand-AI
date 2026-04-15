import { ApiError } from "../../../utils/apiError.js";

const store = new Map();

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 15;

const cleanup = () => {
  const now = Date.now();
  for (const [key, val] of store.entries()) {
    if (val.resetAt < now) store.delete(key);
  }
};

setInterval(cleanup, 5 * 60 * 1000);

export const chatRateLimiter = (req, res, next) => {
  const key = req.user?._id?.toString() || req.ip;
  const now = Date.now();

  let record = store.get(key);

  if (!record || record.resetAt < now) {
    record = { count: 1, resetAt: now + WINDOW_MS };
    store.set(key, record);
  } else {
    record.count += 1;
  }

  res.setHeader("X-RateLimit-Limit", MAX_REQUESTS);
  res.setHeader(
    "X-RateLimit-Remaining",
    Math.max(0, MAX_REQUESTS - record.count)
  );
  res.setHeader(
    "X-RateLimit-Reset",
    Math.ceil(record.resetAt / 1000)
  );

  if (record.count > MAX_REQUESTS) {
    return next(
      new ApiError(429, "Too many requests. Please try again later.")
    );
  }

  next();
};