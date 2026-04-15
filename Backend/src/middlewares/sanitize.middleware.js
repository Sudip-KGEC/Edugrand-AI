function clean(obj) {
  if (!obj || typeof obj !== "object") return;

  for (const key in obj) {
    if (key.startsWith("$") || key.includes(".")) {
      delete obj[key];
      continue;
    }

    if (typeof obj[key] === "string") {
      obj[key] = obj[key]
        .replace(/<script.*?>.*?<\/script>/gi, "")
        .replace(/<.*?>/g, "");
    }

    if (typeof obj[key] === "object") {
      clean(obj[key]);
    }
  }
}

export const sanitizeMiddleware = (req, _res, next) => {
  clean(req.body);
  clean(req.params);
  next();
};