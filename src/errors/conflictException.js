//총돌에 대한 에러 

import { HttpException } from './httpException';

export class conflictException extends HttpException {
  constructor(description = 'CONFLICT') {
    super(description, 409);
  }
}
