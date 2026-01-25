import { prisma } from '#db/prisma.js';

function createComment(data) {
  return prisma.comment.create({ data });
}

function findCommentById(id) {
  return prisma.comment.findUnique({
    where: { id },
  });
}

function updateComment(id, data) {
  return prisma.comment.update({
    where: { id },
    data,
  });
}

function deleteComment(id) {
  return prisma.comment.delete({
    where: { id },
  });
}

// 상품 댓글 목록 조회 커서 페이지네이션
async function getProductCommentsWithCursor({ cursorId, limit = 10 }) {
  const comments = await prisma.comment.findMany({
    take: limit,
    skip: cursorId ? 1 : 0, // cursor 포함 여부 조절
    cursor: cursorId ? { id: cursorId } : undefined,
    orderBy: { createdAt: 'desc' },
    include: {
      product: {
        select: { name: true, description: true, price: true },
      },
    },
  });

  return {
    comments,
    nextCursor: comments.length ? comments[comments.length - 1].id : null,
  };
}

// 게시글 댓글 목록 조회 커서 페이지네이션
async function getArticleCommentsWithCursor({ cursorId, limit = 10 }) {
  const comments = await prisma.comment.findMany({
    take: Number(limit),
    skip: cursorId ? 1 : 0,
    cursor: cursorId ? { id: Number(cursorId) } : undefined,
    orderBy: { createdAt: 'desc' },
    include: {
      article: {
        select: { title: true, content: true },
      },
    },
  });

  return {
    comments,
    nextCursor: comments.length ? comments[comments.length - 1].id : null,
  };
}

export const commentRepository = {
  createComment,
  findCommentById,
  updateComment,
  deleteComment,
  getProductCommentsWithCursor,
  getArticleCommentsWithCursor,
};
