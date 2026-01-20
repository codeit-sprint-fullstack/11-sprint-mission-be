import { HttpException } from '../errors/httpException.js';

export const errorHandler = (error, req, res, _next) => {
  console.error('error message:', error);
  if (error instanceof HttpException) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: Object.values(error.errors)[0].message,
    });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: '유효하지 않은 ID 형식입니다.',
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};
