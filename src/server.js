import express from 'express';
import { connectDB } from './db/index.js';
import { config } from './config/config.js';
import { router } from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { cors } from './middlewares/cors.js';

const app = express();
await connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors);

app.use('/api', router);

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running on http://localhost:${config.PORT}`);
});
