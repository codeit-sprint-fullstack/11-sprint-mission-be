import { HttpException } from "./httpException.js";

export class conflictException extends HttpException {
  constructor(description = "CONFLICT") {
    super(description, 409);
  }
}
