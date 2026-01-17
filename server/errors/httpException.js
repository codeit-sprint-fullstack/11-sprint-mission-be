// 기본 에러
export class HttpException extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// 400 에러
export class BadRequestException extends HttpException {
  constructor(message = '잘못된 요청입니다.') {
    super(message, 400);
  }
}

// 404 에러
export class NotFoundException extends HttpException {
  constructor(message = '찾을 수 없습니다.') {
    super(message, 404);
  }
}
