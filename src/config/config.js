import { flattenError, z } from 'zod';

// 환경 변수 검증
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().min(1000).max(65535).default(5001),
  MONGO_URI: z.string().startsWith('mongodb+srv://'),
});

const parseEnvironment = () => {
  try {
    return envSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      MONGO_URI: process.env.MONGO_URI,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const flatten = flattenError(error);
      console.error('환경 변수 검증 실패:', flatten);
    }
    process.exit(1);
  }
};

export const config = parseEnvironment();

// 환경별 헬퍼 상수
export const isDevelopment = config.NODE_ENV === 'development'; // boolean
export const isProduction = config.NODE_ENV === 'production'; // boolean
export const isTest = config.NODE_ENV === 'test'; // boolean
