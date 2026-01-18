import { HttpException } from "./httpException.js";

export class notFoundException extends HttpException {
  constructor(description = "NOT_FOUND") {
    super(description, 404);
  }
}
