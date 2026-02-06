import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './db/index.js';
import productRoutes from './routes/products.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { HTTP_STATUS } from './constants/statusCodes.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(helmet());
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'] }));
app.use(express.json({ limit: '10mb' }));

await connectDB();

app.use('/api/products', productRoutes);

app.get('/health', (req, res) => {
  res
    .status(HTTP_STATUS.OK)
    .json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('*', (req, res) => {
  res
    .status(HTTP_STATUS.NOT_FOUND)
    .json({ error: '요청하신 경로를 찾을 수 없습니다' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 BE 서버: http://localhost:${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/health`);
  console.log(`📦 Products: http://localhost:${PORT}/api/products`);
});
