import { HttpException } from "./httpException";

export class badRequestException extends HttpException {
  constructor(description = "BAD_REQUEST") {
    super(description, 400);
  }
}
