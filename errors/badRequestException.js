//잘못된 요청에 대한 에러

import { HttpException } from './httpException.js';

export class BadRequestException extends HttpException {
  constructor(description = 'BAD_REQUEST') {
    super(description, 400);
  }
}
