import { HttpException } from './httpException.js';

// 404 Not Found 전용 예외 (요청한 리소스를 찾지 못했을 때)
export class NotFoundException extends HttpException {
  constructor(description = 'NOT_FOUND') {
    super(description, 404);
  }
}
