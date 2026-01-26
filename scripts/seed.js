import { PrismaClient } from '#generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';
import { faker } from '@faker-js/faker';

faker.locale = 'ko'
const NUM_ARTICLE_TO_CREATE = 10;

const xs = (n) => Array.from({ length: n }, (_, i) => i + 1);

// 상품 데이터 생성 함수
const makeProductInputs = () => ({
  name: faker.commerce.productName(),
  description: faker.lorem.paragraph({ min: 1, max: 3 }, '\n\n'),
  price: Number(faker.commerce.price({ min: 1000, max: 500000, dec: 0 })),
  tags: faker.helpers.arrayElements(
    ['전자기기', '가구', '책', '생활용품','의류'],
    { min: 1, max: 3}
  )
})

//게시글 데이터 생성 함수
const makeArticleInputs = () => ({
  title: faker.lorem.sentence({ min: 3, max: 7 }),
  content: faker.lorem.paragraph({ min: 1, max: 3 }, '\n\n'),
});

// 상품 댓글 데이터 생성 함수
const makeCommentInputsForProduct = (productId, count) => 
  xs(count).map(() => ({
     content: faker.lorem.sentence({ min: 3, max: 5 }),
    productId,
  }))


//게시글 댓글 데이터 생성 함수
const makeCommentInputsForArticle = (articleId, count) =>
  xs(count).map(() => ({
    content: faker.lorem.sentence({ min: 3, max: 5 }),
    articleId,
  }));

//트랜잭션으로 기존 데이터 삭제
const resetDb = (prisma) =>
  prisma.$transaction([
    prisma.article.deleteMany(),
    prisma.comment.deleteMany(),
  ]);

// 상품 시딩 
const seedProducts = async (prisma, count) => {
  const data = xs(count).map(makeProductInputs);
  return await prisma.product.createManyAndReturn({
    data,
    select: { id: true }
  })
}

//게시글 시딩
const seedArticles = async (prisma, count) => {
  const data = xs(count).map(makeArticleInputs);
  return await prisma.article.createManyAndReturn({
    data,
    select: { id: true },
  });
};

//상품에 댓글 시딩
const seedProductComments = async (prisma, products) => {
  const data = products.flatMap((product) => {
    const productCommentCount = faker.number.int({ min: 1, max: 4 });
    return makeCommentInputsForProduct(product.id, productCommentCount)
  })
  await prisma.comment.createMany({ data });
  return data.length;
}


//게시글에 댓글 시딩
const seedArticleComments = async (prisma, articles) => {
  const data = articles.flatMap((article) => {
    const articleCommentCount = faker.number.int({ min: 1, max: 4 });
    return makeCommentInputsForArticle(article.id, articleCommentCount);
  });
  await prisma.comment.createMany({ data });
  return data.length;
};

async function main(prisma) {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('프로덕션 환경에서는 시딩을 실행하지 않습니다');
  }
  if (!process.env.DATABASE_URL?.includes('localhost')) {
    throw new Error('localhost 데이터베이스에만 시딩을 실행할 수 있습니다');
  }
  console.log('🌱 시딩 시작...');

  await resetDb(prisma);
  console.log('기존 데이터 삭제 완료');
  
  const products = await seedProducts(prisma, NUM_ARTICLE_TO_CREATE);
  console.log(`${products.length}개의 상품이 생성되었습니다`);

  const articles = await seedArticles(prisma, NUM_ARTICLE_TO_CREATE);
  console.log(`${articles.length}개의 게시글이 생성되었습니다`);

  const productCommentCount = await seedProductComments(prisma, products);
  console.log(`${productCommentCount}개의 상품댓글이 생성되었습니다`);

  const articleCommentCount = await seedArticleComments(prisma, articles);
  console.log(`${articleCommentCount}개의 게시글댓글이 생성되었습니다`);

  console.log('데이터 시딩 완료');
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

main(prisma)
  .catch((e) => {
    console.error('❌ 시딩 에러:', e);
    process.exit(1); // 프로세스 종료
  })
  .finally(async () => {
    await prisma.$disconnect();
  });