import { Prisma } from '#generated/prisma/client.ts';
import { HTTP_STATUS, PRISMA_ERROR } from '#constants';

export const errorHandler = (err, req, res, _next) => {
  console.error(err.stack);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === PRISMA_ERROR.RECORD_NOT_FOUND) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: '요청한 리소스를 찾을 수 없습니다.',
      });
    }
  }

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: '서버 내부 오류가 발생했습니다.',
  });
};
