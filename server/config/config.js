// 환경변수 검사
import dotenv from 'dotenv';
import { z } from 'zod';
import Path from 'path';

dotenv.config({
  path: Path.resolve(
    process.cwd(),
    'env',
    `.env.${process.env.NODE_ENV || 'development'}`
  ),
});

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  MONGO_URI: z.string().startsWith('mongodb+srv://'),
});

export const config = envSchema.parse(process.env);
export const isDevelopment = config.NODE_ENV === 'development';
