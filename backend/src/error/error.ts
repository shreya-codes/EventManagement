import { ErrorMap } from "../constants/error.constants";

export interface ICustomError {
  type?: string;
  message?: string;
  statusCode?: number;
  [options: string | number | symbol]: any;
}
export class CustomAppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly options: any;
  constructor({
    type = ErrorMap.UnknownError().name,
    message = ErrorMap.UnknownError().name,
    statusCode,
    ...options
  }: ICustomError) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

    this.statusCode = statusCode || ErrorMap[type]()?.statusCode || 400;
    this.isOperational = options?.isOperational || true;
    this.options = options;
  }
}
export class APIError extends CustomAppError {
  constructor(
    errorData: any = ErrorMap.BadRequestError(),
    message?: string,
    args?: any
  ) {
    super({ ...errorData, ...args });
    if (message) this.message = message;
    if (errorData.name) this.name = errorData.name;
  }
}
