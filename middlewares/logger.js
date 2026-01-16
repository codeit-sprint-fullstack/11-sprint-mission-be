//로깅 미들웨어
//요청과 응답에 대한 기록

export const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp} ${req.method} ${req.url}]`);
  next();
};
