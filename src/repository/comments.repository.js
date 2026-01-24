import { prisma } from '#db/prisma.js';

//중코마켓 댓글 등록
function createMarketComment(data) {
  return prisma.comment.create({
    data,
  });
}

//자유게시판 댓글 등록
function createArticleComment(data) {
  return prisma.comment.create({
    data,
  });
}

// 특정 댓글 조회 
function findCommentById(id) {
  return prisma.article.findUnique({
    where: { id },
  });
}


// 댓글 수정
function updateComment(id, data) {
  return prisma.comment.update({
    where: { id },
    data,
  });
}

//댓글 삭제
function deleteComment(id) {
  return prisma.comment.delete({
    where: { id },
  });
}

// 중고마켓 댓글 목록 조회 (수정할것))
function findMarketComment(MarketId, limit, cursor) {
  const comments = prisma.comment.findMany({
    where: {
      MarketId,
      ...(cursor && { id: { lt: cursor } }),
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
    orderBy: { id: 'desc' },
    take: limit + 1,
  });

  const hasNext = comments.length > limit;
  const items = hasNext ? comments.slice(0, limit) : comments;
  const nextCursor = hasNext ? items[items.length - 1].id : null;

  return {
    items,
    nextCursor,
  };
}


// 자유게시판 댓글 목록 조회
function findArticleComment(articleId, limit, cursor) {
  const comments = prisma.comment.findMany({
    where: {
      articleId,
      ...(cursor && { id: { lt: cursor } }),
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
    orderBy: { id: 'desc' },
    take: limit + 1,
  });

  const hasNext = comments.length > limit;
  const items = hasNext ? comments.slice(0, limit) : comments;
  const nextCursor = hasNext ? items[items.length - 1].id : null;

  return {
    items,
    nextCursor,
  };
}

export const commentRepository = {
  createMarketComment,
  createArticleComment,
  findCommentById,
  updateComment,
  deleteComment,
  findMarketComment,
  findArticleComment
};
