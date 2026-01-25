import { isDevelopment } from '#config';
import { ERROR_MESSAGE, HTTP_STATUS, PRISMA_ERROR } from '#constants';
import { HttpException } from '#exceptions';

export const errorHandler = (error, req, res, _next) => {
  console.error(error.stack);

  // HttpException 상속 에러
  if (error instanceof HttpException) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      ...(isDevelopment && error.details && { details: error.details }),
    });
  }

  // Prisma Record not found
  if (error.code === PRISMA_ERROR.RECORD_NOT_FOUND) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: ERROR_MESSAGE.NOT_FOUND,
    });
  }

  // 그 외 모든 에러
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
  });
};
