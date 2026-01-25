import { PrismaClient } from '#generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';
import { faker } from '@faker-js/faker';
import { isDevelopment } from '#config';

const DEFAULT_SEED_COUNT = 5;

const xs = (n) => Array.from({ length: n }, (_, i) => i + 1);

const makeProductInput = () => ({
  name: faker.commerce.productName(),
  description: faker.lorem.paragraph(),
  price: faker.number.int({ min: 1000, max: 50000 }),
});

const makeCommentInputForProduct = (productId, count) =>
  xs(count).map(() => ({
    content: faker.lorem.sentence(),
    productId,
  }));

const makeArticleInput = () => ({
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs({ min: 2, max: 5 }, '\n\n'),
});

const makeCommentInputForArticle = (articleId, count) =>
  xs(count).map(() => ({
    content: faker.lorem.sentence(),
    articleId,
  }));

const resetDb = (prisma) =>
  prisma.$transaction([
    prisma.comment.deleteMany(),
    prisma.product.deleteMany(),
    prisma.article.deleteMany(),
  ]);

const seedProducts = async (prisma, count) => {
  const data = xs(count).map(makeProductInput); // faker로 가짜 필드 객체 배열 만들기

  const result = [];

  for (let i = 0; i < count; i++) {
    // 객체 하나씩 꺼내서 id만 모아서 리턴
    const created = await prisma.product.create({ data: data[i] });
    result.push({ id: created.id });
  }
  return result;
};

const seedCommentsForProduct = async (prisma, products) => {
  const data = products
    .map((p) => ({
      id: p.id,
      count: faker.number.int({ min: 1, max: 3 }),
    }))
    .flatMap(({ id, count }) => makeCommentInputForProduct(id, count)); // 평평한 배열로 만들기

  await prisma.comment.createMany({ data });
};

const seedArticles = async (prisma, count) => {
  const data = xs(count).map(makeArticleInput);

  const result = [];

  for (let i = 0; i < count; i++) {
    const created = await prisma.article.create({ data: data[i] });
    result.push({ id: created.id });
  }
  return result;
};

const seedCommentsForArticle = async (prisma, articles) => {
  const data = articles
    .map((a) => ({
      id: a.id,
      count: faker.number.int({ min: 1, max: 3 }),
    }))
    .flatMap(({ id, count }) => makeCommentInputForArticle(id, count)); // 평평한 배열로 만들기

  await prisma.comment.createMany({ data });
};

async function main(prisma) {
  if (!isDevelopment) {
    throw new Error('⚠️  프로덕션 환경에서는 시딩을 실행하지 않습니다');
  }

  console.log('🌱 시딩 시작...');

  await resetDb(prisma);
  console.log('✅ 기존 데이터 삭제 완료');

  const products = await seedProducts(prisma, DEFAULT_SEED_COUNT);
  await seedCommentsForProduct(prisma, products);
  console.log(`✅ ${products.length}개의 상품이 생성되었습니다`);

  const articles = await seedArticles(prisma, DEFAULT_SEED_COUNT);
  await seedCommentsForArticle(prisma, articles);
  console.log(`✅ ${articles.length}개의 게시글이 생성되었습니다`);

  console.log('✅ 데이터 시딩 완료');
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

main(prisma)
  .catch((e) => {
    console.error('❌ 시딩 에러:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
