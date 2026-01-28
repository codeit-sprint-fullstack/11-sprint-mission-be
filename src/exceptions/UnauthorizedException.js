import { HttpException } from './HttpException.js';
import { ERROR_MESSAGE } from '#constants';

export class UnauthorizedException extends HttpException {
  constructor(message = ERROR_MESSAGE.UNAUTHORIZED, details = null) {
    super(401, message, details);
  }
}
