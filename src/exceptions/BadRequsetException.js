import { HttpException } from './HttpException.js';
import { ERROR_MESSAGE } from '#constants';

export class BadRequestException extends HttpException {
  constructor(message = ERROR_MESSAGE.BAD_REQUEST, details = null) {
    super(400, message, details);
  }
}
