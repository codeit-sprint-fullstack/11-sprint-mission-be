export const cors = (req, res, next) => {
  const origin = req.headers.origin;
  const isProduction = process.env.NODE_ENV === 'production';

  const whiteList = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://your-production-site.com',
    'https://admin.your-site.com',
  ];

  const isAllowed = !isProduction || (origin && whiteList.includes(origin));

  if (isAllowed && origin) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  } else if (!isProduction) {
    // 개발 환경을 위해 최소한의 허용
    res.header('Access-Control-Allow-Origin', '*');
  }

  // 공통 헤더 설정
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  );
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 사전 요청 처리
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
};
