import { prisma } from '#db/prisma.js';

//게시글 등록
function createArticle(data) {
  return prisma.article.create({
    data,
  });
}

// 특정 게시글 조회
function findArticleById(id) {
  return prisma.article.findUnique({
    where: { id },
  });
}

// 게시글 수정
function updateArticle(id, data) {
  return prisma.article.update({
    where: { id },
    data,
  });
}

//게시글 삭제
function deleteArticle(id) {
  return prisma.article.delete({
    where: { id },
  });
}

// 게시글 목록 조회
async function findArticlesByFilter(page = 1, pageSize = 10, keyword = '') {
  const skip = (page - 1) * pageSize;
  const where = {
    ...(keyword?.trim() && {
      OR: [
        { title: { contains: keyword, mode: 'insensitive' } },
        { content: { contains: keyword, mode: 'insensitive' } },
      ],
    }),
  };
  const [articles, totalCount] = await Promise.all([
    prisma.article.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      },
    }),
    prisma.article.count({ where }),
  ]);
  return {
    articles,
    totalCount,
  };
}

export const articleRepository = {
  createArticle,
  findArticleById,
  updateArticle,
  deleteArticle,
  findArticlesByFilter,
};
