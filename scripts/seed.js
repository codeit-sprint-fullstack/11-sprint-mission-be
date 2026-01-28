import { PrismaClient } from "#generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import { faker } from "@faker-js/faker";

const NUM_ARTICLES_TO_CREATE = 5;

const xs = (n) => Array.from({ length: n }, (_, i) => i + 1);

const makeArticleInputs = (count) =>
  xs(count).map(() => ({
    title: faker.lorem.sentence({ min: 1, max: 10 }),
    content: faker.lorem.sentence({ min: 10, max: 100 }),
  }));

const resetDB = async (prisma) => {
  await prisma.article.deleteMany();
};

const seedArticles = async (prisma, count) => {
  const data = makeArticleInputs(count)
  return await prisma.article.createMany({ data });
};

async function main(prisma) {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("프로덕션 환경에서는 시딩을 실행하지 않습니다");
  }

  console.log("시딩 시작");

  await resetDB(prisma);
  console.log("기존 데이터 삭제 완료");

  const articles = await seedArticles(prisma, NUM_ARTICLES_TO_CREATE);

  console.log(`${articles.count}개의 게시글이 생성되었습니다`);
  console.log("데이터 시딩 완료");
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

main(prisma)
  .catch((e) => {
    console.error("시딩 에러", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
