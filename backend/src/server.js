import express from 'express';
import { router } from './routes/index.js';
import dotenv from 'dotenv';

dotenv.config({
  path: './env/.env.development',
});

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
