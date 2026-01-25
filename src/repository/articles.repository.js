import { prisma } from '#db/prisma.js';

async function findAllArticles({ offset, limit, keyword }) {
  const filter = keyword?.trim()
    ? {
        OR: [
          { title: { contains: keyword.trim(), mode: 'insensitive' } },
          { content: { contains: keyword.trim(), mode: 'insensitive' } },
        ],
      }
    : {};

  const [articles, totalCount] = await Promise.all([
    prisma.article.findMany({
      where: filter,
      skip: offset ? Number(offset) : undefined,
      take: limit ? Number(limit) : undefined,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        _count: {
          select: { comments: true },
        },
      },
    }),
    prisma.article.count({ where: filter }),
  ]);

  return { articles, totalCount };
}

function findArticleById(id) {
  return prisma.article.findUnique({
    where: { id: Number(id) },
    include: {comments: true},
  });
}

function createArticle(data) {
  return prisma.article.create({
    data,
  });
}

function updateArticle(id, data) {
  return prisma.article.update({
    where: { id: Number(id) },
    data,
  });
}

function deleteArticle(id) {
  return prisma.article.delete({
    where: { id: Number(id) },
  });
}

export const articleRepository = {
  findAllArticles,
  findArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
