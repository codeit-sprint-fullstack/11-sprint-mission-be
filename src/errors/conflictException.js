import { HttpException } from "./httpException";

export class conflictException extends HttpException {
  constructor(description = "CONFLICT") {
    super(description, 409);
  }
}
