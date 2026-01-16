export const cors = (req, res, next) => {
  const origin = req.headers.origin; // 클라이언트 주소 

  const whiteList = [
    'https://your-production-site.com', // 서비스 도메인(유저용 프론트)
    'https://admin.your-site.com' // 어드민 도메인(관리자용 프론트)
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