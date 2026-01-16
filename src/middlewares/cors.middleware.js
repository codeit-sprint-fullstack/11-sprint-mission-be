export const cors = (req, res, next) => {
  const origin = req.headers.origin;
  const isProduction = process.env.NODE_ENV === 'production';

  //console.log('node_env: ', process.env.NODE_ENV);

  const whiteList = ['https://admin.my-site.com'];

  const isAllowed = !isProduction || (origin && whiteList.includes(origin));

  if (isAllowed && origin) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  } else if (!isProduction) {
    // 개발 환경에서는 모든 경로를 통과
    res.header('Access-Control-Allow-Origin', '*');
  }

  // 공통 헤더 설정
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );

  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-api-key'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
};
