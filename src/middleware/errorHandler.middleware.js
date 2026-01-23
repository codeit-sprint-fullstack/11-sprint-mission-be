import { HttpException } from '../errors/httpException.js';

export const errorHandler = (error, req, res, _next) => {
  // 커스텀 예외 처리
  if (error instanceof HttpException) {
    return res.status(error.statusCode).json({
      message: error.message,
      stack: config.ENV === 'development' ? error.stack : undefined,
    });
  }

  // 알 수 없는 에러 처리
  console.error('알 수 없는 에러:', error);

  res.status(500).json({
    message: '서버 내부 오류가 발생했습니다.',
    stack: config.ENV === 'development' ? error.stack : undefined,
  });
};
