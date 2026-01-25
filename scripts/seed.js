import { PrismaClient } from '#generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';
import { faker } from '@faker-js/faker';

const NUM_ARTICLES = 5;
const NUM_PRODUCTS = 5;
const NUM_COMMENTS = 20;

const xs = (n) => Array.from({ length: n }, (_, i) => i + 1);

const pickRandom = (array) =>
  array[faker.number.int({ min: 0, max: array.length - 1 })];

// 데이터 생성 함수
const makeArticles = (count) =>
  xs(count).map(() => ({
    title: faker.lorem.sentence({ min: 3, max: 8 }),
    content: faker.lorem.paragraphs({ min: 2, max: 5 }, '\n\n'),
  }));

const makeProducts = (count) =>
  xs(count).map(() => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
  }));

const makeComments = (count, targets, targetId) =>
  xs(count).map(() => ({
    content: faker.lorem.sentence({ min: 1, max: 3 }),
    [targetId]: pickRandom(targets).id,
  }));

// 기존 데이터 삭제
const resetDb = (prisma) =>
  prisma.$transaction([
    prisma.productComment.deleteMany(),
    prisma.articleComment.deleteMany(),
    prisma.product.deleteMany(),
    prisma.article.deleteMany(),
  ]);

// 시딩
const seedArticles = async (prisma, count) => {
  const data = makeArticles(count);

  return await prisma.article.createManyAndReturn({
    data,
    select: {id: true},
  });
};
  
const seedProducts = async (prisma, count) => {
  const data = makeProducts(count);

  return await prisma.product.createManyAndReturn({
    data,
    select: {id: true},
  });
};

const seedComments = async (prisma, count, targets, targetId, modelName) => {
  const data = makeComments(count, targets, targetId);
  if (data.length > 0) {
    await prisma[modelName].createMany({data});
  }
};

// 실행
async function main(prisma) {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('프로덕션 환경에서는 시딩을 실행하지 않습니다');
  }

  if (!process.env.DATABASE_URL?.includes('localhost')) {
    throw new Error('localhost 데이터베이스에만 시딩을 실행할 수 있습니다');
  }

  console.log('시딩 시작');

  await resetDb(prisma);
  console.log('기존 데이터 삭제 완료');

  const articles = await seedArticles(prisma, NUM_ARTICLES);
  const products = await seedProducts(prisma, NUM_PRODUCTS);

  await seedComments(prisma, NUM_COMMENTS, articles, 'articleId', 'articleComment');
  await seedComments(prisma, NUM_COMMENTS, products, 'productId', 'productComment');

  console.log('데이터 시딩 완료');
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

main(prisma)
  .catch((e) => {
    console.error('시딩 에러:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });