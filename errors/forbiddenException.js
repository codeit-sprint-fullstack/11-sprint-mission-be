//권한 관련 에러

import { HttpException } from './httpException.js';

export class ForbiddenException extends HttpException {
  constructor(description = 'FORBIDDEN') {
    super(description, 403);
  }
}
