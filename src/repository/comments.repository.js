import { prisma } from '#db/prisma.js';

//중코마켓 댓글 등록
function createProductComment(productId, data) {
  return prisma.comment.create({
    data: {
      ...data,
      productId,   
    },
  });
}

//자유게시판 댓글 등록
function createArticleComment(articleId, data) {
  return prisma.comment.create({
    data: {
      ...data,
      articleId,   
    },
  });
}

// 특정 댓글 조회 
function findCommentById(id) {
  return prisma.comment.findUnique({
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

// 중고마켓 댓글 목록 조회 
async function findProductComments(productId, limit = 10, cursor) {
  const comments = await prisma.comment.findMany({
    where: {
      productId,
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
  const list = hasNext ? comments.slice(0, limit) : comments;
  const nextCursor = hasNext ? list[list.length - 1].id : null;

  return {
    list,
    nextCursor,
  };
}


// 자유게시판 댓글 목록 조회
async function findArticleComments(articleId, limit = 10, cursor) {
  const comments = await prisma.comment.findMany({
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
  const list = hasNext ? comments.slice(0, limit) : comments;
  const nextCursor = hasNext ? list[list.length - 1].id : null;

  return {
    list,
    nextCursor,
  };
}

export const commentRepository = {
  createProductComment,
  createArticleComment,
  findCommentById,
  updateComment,
  deleteComment,
  findProductComments,
  findArticleComments
};
