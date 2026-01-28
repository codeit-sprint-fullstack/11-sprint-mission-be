import { prisma } from '#db/prisma.js';

// 게시글 등록
function createArticle(data) {
  return prisma.article.create({ data });
}

// 게시글 조회
function findArticleById(id) {
  return prisma.article.findUnique({ where: { id } });
}

// 게시글 목록 조회
function findAllArticles({ skip, take, orderBy, keyword }) {
  const where = keyword
    ? {
        OR: [
          { title: { contains: keyword, mode: 'insensitive' } },
          { content: { contains: keyword, mode: 'insensitive' } },
        ],
      }
    : {};

  return prisma.article.findMany({
    where,
    orderBy: {
      createdAt: orderBy === 'recent' ? 'desc' : 'asc',
    },
    skip: Number(skip) || 0,
    take: Number(take) || 10,
  });
}

// 게시글 수정
function updateArticle(id, data) {
  return prisma.article.update({
    where: { id },
    data,
  });
}

// 게시글 삭제
function deleteArticle(id) {
  return prisma.article.delete({ where: { id } });
}

export const articleRepository = {
  createArticle,
  findArticleById,
  findAllArticles,
  updateArticle,
  deleteArticle,
};
