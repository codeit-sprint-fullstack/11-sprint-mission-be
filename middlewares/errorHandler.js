//에러 미들에어 

import { HttpException } from '../errors/httpException';

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

  return res.status(500).json(result);
};
