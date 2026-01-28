import { prisma } from '#db/prisma.js';

function createArticleComment(articleId, content) {
  return prisma.articleComment.create({
    data: {
      articleId: Number(articleId),
      content,
    },
  });
}

function updateArticleComment(id, content) {
  return prisma.articleComment.update({
    where: { id: Number(id) },
    data: { content },
  });
}

function deleteArticleComment(id) {
  return prisma.articleComment.delete({
    where: { id: Number(id) },
  });
}

function searchArticleCommentsWithPagination(articleId, cursor, take = 10) {
  return prisma.articleComment.findMany({
    where: { articleId: Number(articleId) },
    orderBy: { createdAt: 'desc' },
    take: Number(take) + 1,
    ...(cursor
      ? {
          cursor: { id: Number(cursor) },
          skip: 1,
        }
      : {}),
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });
}

export const articleCommentRepository = {
  createArticleComment,
  updateArticleComment,
  deleteArticleComment,
  searchArticleCommentsWithPagination,
};
