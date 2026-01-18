import { HttpException } from './httpException.js';

// 400 Bad Request 전용 예외 (요청값/검증 오류용)
export class BadRequestException extends HttpException {
  constructor(description = 'BAD_REQUEST') {
    // HttpException을 상속받아
    // description을 안 주면 message가 "BAD_REQUEST"가 됨
    // name은 "BadRequestException" (클래스 이름)
    // statusCode는 400
    super(description, 400);
  }
}
