import { ERROR_MESSAGE, HTTP_STATUS } from '#constants';
import { HttpException } from '#exceptions';

export const errorHandler = (error, req, res, _next) => {
  if (error instanceof HttpException) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      ...(error.details && { details: error.details }),
    });
  }
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
  });
};
