import { isProduction } from '#config';

export const cors = (req, res, next) => {
  const origin = req.headers.origin;

  //render 주소 추가 + 프론트엔드 폴더 주소 확인 후 추가할 것
  const whiteList = [
    'http://localhost:5001',
    'http://localhost:5173',
  ];

  const isAllowed = !isProduction || (origin && whiteList.includes(origin));

  if (isAllowed && origin) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  } else if (!isProduction) {
    res.header('Access-Control-Allow-Origin', '*');
  }

  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  );
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
};
