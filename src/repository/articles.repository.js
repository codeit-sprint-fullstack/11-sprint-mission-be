import { prisma } from "#db/prisma.js";

function createArticle(data) {
  return prisma.article.create({
    data,
  });
}

function findArticleById(id) {
  return prisma.article.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
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

async function searchArticlesWithPagination(search, page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const where =
    search && search.trim()
      ? {
          OR: [
            { title: { contains: search.trim(), mode: "insensitive" } },
            { content: { contains: search.trim(), mode: "insensitive" } },
          ],
        }
      : undefined;

  const [articles, totalCount] = await Promise.all([
    prisma.article.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      },
    }),
    prisma.article.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    articles,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}


export const articleRepository = {
  createArticle,
  findArticleById,
  updateArticle,
  deleteArticle,
  searchArticlesWithPagination,
};
