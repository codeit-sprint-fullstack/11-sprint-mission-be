import { HttpException } from '../errors/httpException.js';
import { isDevelopment } from '../config/config.js';

export const errorHandler = (err, req, res, _next) => {
  //지금 들어온 err 객체가 HttpException(또는 HttpException을 상속한 클래스)로 만들어진 인스턴스냐?”를 체크
  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  let result = {
    success: false,
    message: 'Internal Server Error',
  };

  if (isDevelopment) {
    result = { ...result, err };
  }

  return res.status(500).json(result);
};
