export const cors = (req, res, next) => {
  const origin = req.headers.origin; // 클라이언트 주소 
  const isProduction = process.env.NODE_ENV === 'production';

  const whiteList = [
    'http://localhost:5173/'
  ];

  const isAllowed = !isProduction || (origin && whiteList.includes(origin));

	if (isAllowed && origin) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  } else if (!isProduction) {
    res.header('Access-Control-Allow-Origin', '*');
  }

   // 공통 헤더 설정
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
   if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
   }
  next();
};