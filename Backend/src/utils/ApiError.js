class ApiError extends Error {
  constructor({
    statusCode = 500,
    message = "Something went wrong",
    errors = [],
    isOperational = true,
  }) {
    super(message);

    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }

  // Static helpers 
  static badRequest(message = "Bad Request", errors = []) {
    return new ApiError({ statusCode: 400, message, errors });
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError({ statusCode: 401, message });
  }

  static forbidden(message = "Forbidden") {
    return new ApiError({ statusCode: 403, message });
  }

  static notFound(message = "Not Found") {
    return new ApiError({ statusCode: 404, message });
  }

  static conflict(message = "Conflict") {
    return new ApiError({ statusCode: 409, message });
  }

  static tooManyRequests(message = "Too Many Requests", errors = []) {
    return new ApiError({ statusCode: 429, message, errors });
  }

  static internal(message = "Internal Server Error") {
    return new ApiError({
      statusCode: 500,
      message,
      isOperational: false,
    });
  }
}

export { ApiError };