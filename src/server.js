import express from 'express';
import { router } from './routes/index.js';

const app = express();
const PORT = 5005;

app.use(express.json());

app.use('/', router);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
