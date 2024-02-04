const MESSAGE_FIELD = "Data";

export const ErrorType = {
  AlreadyExistsError: "AlreadyExistsError",
  NotFoundError: "NotFoundError",
  BadRequestError: "BadRequestError",
  UnknownError: "UnknownError",
  ValidationError: "ValidationError",
  ForbiddenError: "ForbiddenError",
  UnauthorizedError: "UnauthorizedError",
};
export const ErrorMap = {
  AlreadyExistsError(model: string = MESSAGE_FIELD) {
    return {
      name: ErrorType.AlreadyExistsError,
      statusCode: 400,
      message: `${model} already exists`,
    };
  },
  NotFoundError(model: string = MESSAGE_FIELD) {
    return {
      name: ErrorType.NotFoundError,
      statusCode: 404,
      message: `${model} not found`,
    };
  },
  BadRequestError(model: string = MESSAGE_FIELD) {
    return {
      name: ErrorType.BadRequestError,
      statusCode: 400,
      message: `Bad Request${model ? " in " + model : ""}`,
    };
  },
  UnknownError(model: string = MESSAGE_FIELD) {
    return {
      name: ErrorType.UnknownError,
      statusCode: 400,
      message: `Unknown error${model ? " in " + model : ""}`,
    };
  },
  ValidationError(model: string = MESSAGE_FIELD) {
    return {
      name: ErrorType.ValidationError,
      statusCode: 400,
      message: `Validation error${model ? " in " + model : ""}`,
    };
  },
  ForbiddenError(this: any) {
    return {
      name: ErrorType.ForbiddenError,
      statusCode: 403,
      message: `Access denied for given user`,
    };
  },
  UnauthorizedError(model = "User") {
    return {
      name: ErrorType.UnauthorizedError,
      statusCode: 401,
      message: `${model} not registered`,
    };
  },
};
