import { isDevelopment } from '../config/config.js';
import { HttpException } from '../errors/errors.js';

export const errorHandler = (error, _req, res, _next) => {
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
    result = { ...result, message: error.message, stack: error.stack };
  }

  return res.status(500).json(result);
};
