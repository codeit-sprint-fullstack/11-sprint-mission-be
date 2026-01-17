import { isProduction } from '../config/config.js';

export const cors = (req, res, next) => {
const origin = req.headers.origin;
  
  
	const whiteList = [
    'https://panda-market-4jmv.onrender.com', // Render.com 배포 주소
    'http://localhost:5173', // Vite 기본 포트
  ];

  const isAllowed = !isProduction || (origin && whiteList.includes(origin));

	if (isAllowed && origin) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  } else if (!isProduction) {
    // 개발 환경인데 Origin 헤더가 없는 경우(Postman 등)를 위해 최소한의 허용
    res.header('Access-Control-Allow-Origin', '*');
  }
  
  // 공통 헤더 설정
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Preflight(사전 요청) 처리
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
};
