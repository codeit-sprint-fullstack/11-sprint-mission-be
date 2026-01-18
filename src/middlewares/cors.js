//cors 미들웨어
//요청 url에 따라 보안하는 코드
//이 부분은 더 공부해야 할거 같아요...😭

export const cors = (req, res, next) => {
  const origin = req.header.origin;
  const isProduction = process.env.NODE_ENV === 'production';

  const whiteList = ['http://zoe-panda-market.com'];
  const isAllowed = !isProduction || (origin && whiteList.includes(origin));

  if (!isAllowed && origin) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  } else if (!isProduction) {
    //개발 환경인데 origin헤더가 없으면 최소한 허용
    res.header('Access-Control-Allow-Origin', '*');
  }

  //공통헤더
  res.header(
    'Access-Control-Allow-Method',
    'GET, POST, PATCH, DELETE, OPTIONS',
  );
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  //사전요청 처리
  if (req.header === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
};
