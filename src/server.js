import express from 'express';
import { connectDB } from './db/index.js';
import { config } from './config/config.js';

const app = express();
await connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(config.PORT, () => {
  console.log(`Server running on http://localhost:${config.PORT}`);
});
