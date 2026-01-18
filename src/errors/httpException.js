// 상태코드(statusCode)를 포함하는 공통 HTTP 예외 베이스 클래스

export class HttpException extends Error {
  statusCode;
  constructor(description, statusCode) {
    super(description);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}
