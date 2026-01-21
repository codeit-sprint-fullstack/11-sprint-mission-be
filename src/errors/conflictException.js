import { HttpException } from './httpException.js';

// 409 Conflict 전용 예외 (중복/충돌 상황용: 예) 이메일 중복)
export class ConflictException extends HttpException {
  constructor(description = 'CONFLICT') {
    super(description, 409);
  }
}
