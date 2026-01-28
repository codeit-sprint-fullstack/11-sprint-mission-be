import { prisma } from '#db/prisma.js';

// 댓글등록
function createComment({ articleId, content }) {
  return prisma.comment.create({
    data: { articleId, content },
    select: { id: true, content: true, createdAt: true },
  });
}

// 댓글 수정
function updateCommnet(id, data) {
  return prisma.comment.update({
    where: { id },
    data,
  });
}

// 댓글삭제
function deleteComment(id) {
  return prisma.comment.delete({
    where: { id },
  });
}

// 댓글 목록 조회
function findeCommnetsByArticleCursor({ articleId, cursorId, take = 10 }) {
  return prisma.comment.findMany({
    where: { articleId },
    take: Number(take) + 1,
    ...(cursorId ? { cursor: { id: cursorId }, skip: 1 } : {}),
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],

    select: { id: true, content: true, createdAt: true },
  });
}

// 페이지 네이션
async function getCommentsPage(params) {
  const take = Number(params.take ?? 10);
  const rows = await findeCommnetsByArticleCursor({ ...params, take });

  const hasNext = rows.length > take;
  const items = hasNext ? rows.slice(0, take) : rows;
  const nextCursor = hasNext ? items[items.length - 1].id : null;

  return { items, nextCursor, hasNext };
}

export const commentRepository = {
  createComment,
  updateCommnet,
  deleteComment,
  getCommentsPage,
};
