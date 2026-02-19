import { PrismaClient } from '#generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from 'pg';
const { Pool } = pkg;
import { faker } from '@faker-js/faker';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// 1. 데이터 초기화 (트랜잭션)
const resetDb = async (prisma) => {
  await prisma.$transaction([
    prisma.comment.deleteMany(),
    prisma.article.deleteMany(),
    prisma.product.deleteMany(),
  ]);
};

// 2. 게시글 시딩 (Article)
const seedArticles = async (prisma) => {
  const data = Array.from({ length: 10 }).map(() => ({
    title: faker.lorem.sentence({ min: 3, max: 8 }),
    content: faker.lorem.paragraphs({ min: 2, max: 5 }, '\n\n'),
  }));

  return await prisma.article.createManyAndReturn({
    data,
    select: { id: true },
  });
};

// 3. 댓글 시딩 (Comment)
const seedComments = async (prisma, articles) => {
  const data = articles.flatMap((article) => {
    const commentCount = faker.number.int({ min: 1, max: 4 });
    return Array.from({ length: commentCount }).map(() => ({
      content: faker.lorem.sentence(),
      articleId: article.id,
    }));
  });

  await prisma.comment.createMany({ data });
  return data.length;
};

async function main() {
  if (
    process.env.NODE_ENV !== 'development' ||
    !process.env.DATABASE_URL?.includes('localhost')
  ) {
    console.error('시딩은 로컬 개발 환경에서만 실행 가능합니다.');
    return;
  }

  console.log('시딩 시작...');
  await resetDb(prisma);
  console.log('기존 데이터 초기화 완료');

  const articles = await seedArticles(prisma);
  console.log(`${articles.length}개의 게시글 생성 완료`);

  const commentCount = await seedComments(prisma, articles);
  console.log(`${commentCount}개의 댓글 생성 완료`);

  console.log('모든 데이터 시딩 완료!');
}

main()
  .catch((e) => {
    console.error('시딩 에러:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
