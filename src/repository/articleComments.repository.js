import { prisma } from '#db/prisma.js';

async function findAllCommentsByArticleId(articleId, { cursor, limit }) {
  const take = Number(limit) || 10;

  const comments = await prisma.articleComment.findMany({
    where: { articleId: Number(articleId) },
    take: take,
    orderBy: { id: 'desc' },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
    ...(cursor ? { cursor: { id: Number(cursor) }, skip: 1 } : {}),
  });

  return comments;
}

function createArticleComment(articleId, content) {
  return prisma.articleComment.create({
    data: {
      content,
      articleId: Number(articleId),
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

export const articleCommentRepository = {
  findAllCommentsByArticleId,
  createArticleComment,
  updateArticleComment,
  deleteArticleComment,
};
