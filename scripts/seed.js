import { PrismaClient } from '#generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';
import { faker } from '@faker-js/faker';
import { config } from '#config';

// adapter, prisma 생성
const adapter = new PrismaPg({ connectionString: config.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// 헬퍼 함수 (배열 생성 (1-n))
const xs = (n) => Array.from({ length: n }, (_, i) => i + 1);

// Product 데이터 생성
const makeProduct = (count) => {
  return xs(count).map(() => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price({ min: 1000, max: 500000, dec: 0 })),
    tags: faker.helpers
      .arrayElements(['seed', 'used', 'cheap', 'new'], { min: 1, max: 2 })
      .join(','),
  }));
};

// Article 생성
const makeArticle = (count) => {
  return xs(count).map(() => ({
    title: faker.lorem.sentence({ min: 3, max: 8 }),
    content: faker.lorem.paragraphs({ min: 2, max: 5 }, '\n\n'),
  }));
};

// Comments 생성
const makeComment = (count) => {
  return xs(count).map(() => ({
    content: faker.lorem.sentence({ min: 3, max: 8 }),
  }));
};

// transaction으로 기존 데이터 삭제
const resetDb = async () => {
  await prisma.$transaction([
    prisma.comment.deleteMany(),
    prisma.article.deleteMany(),
    prisma.product.deleteMany(),
  ]);
};

// Article 시딩 (createMany)
const seedArticle = async (count) => {
  const data = makeArticle(count);
  await prisma.article.createMany({ data });
  return prisma.article.findMany({ select: { id: true } });
};

// Product 시딩 (createMany)
const seedProduct = async (count) => {
  const data = makeProduct(count);
  await prisma.product.createMany({ data });
  return prisma.product.findMany({ select: { id: true } });
};

// Article 댓글 시딩
const seedArticleComment = async (articleIds, commentsPerArticle) => {
  for (const a of articleIds) {
    const comments = makeComment(commentsPerArticle);
    await prisma.comment.createMany({
      data: comments.map((c) => ({
        content: c.content,
        articleId: a.id,
      })),
    });
  }
};

// Product 댓글 시딩
const seedProductComment = async (productIds, commentsPerProduct) => {
  for (const p of productIds) {
    const comments = makeComment(commentsPerProduct);
    await prisma.comment.createMany({
      data: comments.map((c) => ({
        content: c.content,
        productId: p.id,
      })),
    });
  }
};

async function main() {
  // 개발 환경에서만 실행
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('프로덕션 환경에서는 시딩을 실행하지 않습니다.');
  }

  console.log('🌱 시딩 시작...');

  await resetDb();
  console.log('✅ 기존 데이터 삭제 완료');

  const articleIds = await seedArticle(5);
  console.log('✅ Article 시딩 완료');

  const productIds = await seedProduct(5);
  console.log('✅ Product 시딩 완료');

  await seedArticleComment(articleIds, 3);
  console.log('✅ Article 댓글 시딩 완료');

  await seedProductComment(productIds, 3);
  console.log('✅ Product 댓글 시딩 완료');

  console.log('🎉 시딩 완료!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
