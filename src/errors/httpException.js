//에러 + http상태코드  같이 나오게 하는 커스텀에러 

export class HttpException extends Error{
  statusCode;
  constructor(description, statusCode) {
    super(description);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}