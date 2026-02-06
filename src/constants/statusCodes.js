export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const ERROR_MESSAGES = {
  VALIDATION_FAILED: '유효성 검사 실패',
  INVALID_ID: 'ID 형식이 올바르지 않습니다',
  PRODUCT_NOT_FOUND: '상품을 찾을 수 없습니다',
  REQUIRED_FIELDS: '필수 필드를 입력하세요',
  SERVER_ERROR: '서버 내부 오류',
};
