export const cors = (req, res, next) => {
  const origin = req.headers.origin || req.headers.host || '';
  const isDev = process.env.NODE_ENV !== 'production';
  const whiteList = [];

  const isAllowed = isDev || whiteList.includes(origin);

  if (isAllowed) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTION');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
};
