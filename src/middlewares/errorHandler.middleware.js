import { Prisma } from '#generated/prisma/client.js';
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

  // Prisma 에러 처리
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // P2002: Unique constraint 위반
    if (err.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: '이미 존재하는 데이터입니다.',
      });
    }
    // P2025: Record not found
    if (err.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: '데이터를 찾을 수 없습니다.',
      });
    }
    // 그 외 Prisma 에러
    return res.status(400).json({
      success: false,
      message: isDevelopment ? `DB 에러: ${err.code}` : '요청을 처리할 수 없습니다.',
    });
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      success: false,
      message: '잘못된 요청입니다.',
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
