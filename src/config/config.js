//환경 변수 검증 설정
import { z } from 'zod';

const envSchema = z.Object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().min(1000).max(65535).default(5005),
});

const parseEnviroment = () => {
  try {
    return envSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const flatten = flattenError(error);
      console.log('환경 변수 검증 실패:', flatten);
    }
    process.exit(1);
  }
};

export const config = parseEnviroment();

//환경변수 헬퍼 함수....
export const isDevelopment = config.NODE_ENV === 'development';
export const isProduction = config.NODE_ENV === 'production';
export const isTest = config.NODE_ENV === 'test';
