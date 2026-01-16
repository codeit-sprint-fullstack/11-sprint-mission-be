//찾는게 없을때 에러 

import { HtteException, HttpException } from './httpException.js';

export class NotFoundException extends HttpException {
  constructor(description = 'NOT_FOUND') {
    super(description, 404);
  }
}
