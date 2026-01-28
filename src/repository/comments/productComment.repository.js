import { prisma } from '#db/prisma.js';

function createProductComment(productId, content) {
  return prisma.productComment.create({
    data: {
      productId: Number(productId),
      content,
    },
  });
}

function updateProductComment(id, content) {
  return prisma.productComment.update({
    where: { id: Number(id) },
    data: { content },
  });
}

function deleteProductComment(id) {
  return prisma.productComment.delete({
    where: { id: Number(id) },
  });
}

function searchProductCommentsWithPagination(productId, cursor, take = 10) {
  return prisma.productComment.findMany({
    where: { productId: Number(productId) },
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

export const productCommentRepository = {
  createProductComment,
  updateProductComment,
  deleteProductComment,
  searchProductCommentsWithPagination,
};
