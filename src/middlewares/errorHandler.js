import { isDevelopment } from '../config/config';
import { HTTP_STATUS } from '../constants';
import { HttpException } from '../exceptions/httpException';

export const errorHandler = (error, req, res, _next) => {
  console.error('error', error);
  if (error instanceof HttpException) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  let result = {
    success: false,
    message: 'Internal Server Error',
  };

  if (isDevelopment) {
    result = { ...result, error };
  }

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(result);
};
