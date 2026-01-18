//인증 필요 에러
import { HttpException } from './httpException';

export class UnauthorizedException extends HttpException {
  constructor(description = 'Unauthorized') {
    super(description, 401);
  }
}
