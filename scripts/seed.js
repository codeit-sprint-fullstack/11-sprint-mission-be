import { PrismaClient } from '#generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { faker } from '@faker-js/faker';

const NUM_ARTICLES_TO_CREATE = 10;

const xs = (n) => Array.from({ length: n }, (_, i) => i + 1);

const makeArticleInput = () => ({
  title: faker.lorem.sentence({ min: 3, max: 8 }),
  content: faker.lorem.paragraphs({ min: 2, max: 5 }, '\n\n'),
});

const makeCommentInputsForArticle = (articleId, count) =>
  xs(count).map(() => ({
    content: faker.lorem.sentences({ min: 1, max: 3 }),
    articleId,
  }));

const resetDb = (prisma) =>
  prisma.$transaction([
    prisma.comment.deleteMany(),
    prisma.article.deleteMany(),
  ]);

const seedArticles = async (prisma, count) => {
  const data = xs(count).map(makeArticleInput);
  const titles = data.map((a) => a.title);

  await prisma.article.createMany({ data });
  return prisma.article.findMany({
    where: { title: { in: titles } },
    select: { id: true },
  });
};

const seedComments = async (prisma, articles) => {
  const data = articles
    .map((a) => ({
      id: a.id,
      count: faker.number.int({ min: 1, max: 5 }),
    }))
    .flatMap(({ id, count }) => makeCommentInputsForArticle(id, count));

  await prisma.comment.createMany({ data });
};

async function main(prisma) {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('⚠️  프로덕션 환경에서는 시딩을 실행하지 않습니다');
  }

  console.log('🌱 시딩 시작...');

  await resetDb(prisma);
  console.log('✅ 기존 데이터 삭제 완료');

  const articles = await seedArticles(prisma, NUM_ARTICLES_TO_CREATE);
  await seedComments(prisma, articles);

  console.log(`✅ ${articles.length}개의 게시글이 생성되었습니다`);
  console.log('✅ 데이터 시딩 완료');
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

main(prisma)
  .catch((e) => {
    console.error('❌ 시딩 에러:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
