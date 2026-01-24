import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/shema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
