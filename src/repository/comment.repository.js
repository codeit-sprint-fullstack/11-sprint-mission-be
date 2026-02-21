import { prisma } from '#db/prisma.js';

// 댓글 등록
export function createComment(data) {
  return prisma.comment.create({ data });
}

// 댓글 있는지 확인
export function findCommentById(id) {
  return prisma.comment.findUnique({ where: { id } });
}

// 댓글 목록 조회
export function findAllComments({ articleId, productId, cursor, take }) {
  // 중고마켓, 자유게시판 댓글 따로 만들기
  const where = {};
  if (articleId) {
    where.articleId = articleId;
  }
  if (productId) {
    where.productId = productId;
  }

  return prisma.comment.findMany({
    where,
    take: Number(take) || 10,
    // Cursor 방식 페이지네이션 적용
    ...(cursor && { skip: 1, cursor: { id: cursor } }),
    orderBy: { createdAt: 'asc' },
  });
}

// 댓글 수정
export function updateComment(id, data) {
  return prisma.comment.update({
    where: { id },
    data,
  });
}

// 댓글 삭제
export function deleteComment(id) {
  return prisma.comment.delete({ where: { id } });
}
