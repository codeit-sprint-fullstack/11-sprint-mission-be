import { HTTP_STATUS, ERROR_MESSAGES } from '../constants/statusCodes.js';

export const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.message);

  if (err.name === 'ValidationError') {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: ERROR_MESSAGES.VALIDATION_FAILED,
      details: Object.values(err.errors).map((e) => e.message),
    });
  }

  if (err.name === 'CastError') {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: ERROR_MESSAGES.INVALID_ID,
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    error: ERROR_MESSAGES.SERVER_ERROR,
  });
};
