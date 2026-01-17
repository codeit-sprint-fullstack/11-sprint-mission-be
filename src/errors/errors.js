/**
 * 공통 에러 클래스
 */
export class HttpException extends Error {
  statusCode;
  constructor(description, statusCode) {
    super(description);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

/**
 * [400] BadRequest
 */
export class BadRequestError extends HttpException {
  constructor(description = 'BAD_REQUEST') {
    super(description, 400);
  }
}

/**
 * [401] Unauthorized
 */
export class UnauthorizedError extends HttpException {
  constructor(description = 'Unauthorized') {
    super(description, 401);
  }
}

/**
 * [403] Forbidden
 */
export class ForbiddenError extends HttpException {
  constructor(description = 'FORBIDDEN') {
    super(description, 403);
  }
}

/**
 * [404] NotFound
 */
export class NotFoundError extends HttpException {
  constructor(description = 'NOT_FOUND') {
    super(description, 404);
  }
}

/**
 * [409] Conflict
 */
export class ConflictError extends HttpException {
  constructor(description = 'CONFLICT') {
    super(description, 409);
  }
}
