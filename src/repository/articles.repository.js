import { prisma } from '#db/prisma.js';

function createArticle(data) {
  return prisma.article.create({ data });
}

function findArticleById(id) {
  return prisma.article.findUnique({
    where: { id },
  });
}

function findAllArticles() {
  return prisma.article.findMany();
}

function updateArticle(id, data) {
  return prisma.article.update({
    where: { id },
    data,
  });
}

function deleteArticle(id) {
  return prisma.article.delete({
    where: { id },
  });
}

// 게시글과 댓글 함께 조회
function findArticleWithComments(id) {
  return prisma.article.findUnique({
    where: { id },
    include: {
      comments: true,
    },
  });
}

// 검색 + 페이지네이션
async function getArticles({ search, page = 1, limit = 10 }) {
  const safePage = Number(page);
  const safeLimit = Number(limit);
  
  const skip = (safePage - 1) * safeLimit;

  const where = search
    ? {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive', // 대소문자 구별 x
            },
          },
          {
            content: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      }
    : {};

  const [articles, totalCount] = await Promise.all([
    prisma.article.findMany({
      where,
      skip,
      take: safeLimit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.article.count({ where }),
  ]);

  return {
    articles,
    pagination: {
      currentPage: safePage,
      totalPages: Math.ceil(totalCount / safeLimit),
      totalCount,
      hasNext: safePage < Math.ceil(totalCount / safeLimit),
      hasPrev: safePage > 1,
    },
  };
}

export const articleRepository = {
  createArticle,
  findArticleById,
  findAllArticles,
  updateArticle,
  deleteArticle,
  findArticleWithComments,
  getArticles,
};
