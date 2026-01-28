import { prisma } from '#db/prisma.js';

async function findAllCommentsByProductId(productId, { cursor, limit }) {
  const take = Number(limit) || 10;

  const comments = await prisma.productComment.findMany({
    where: { productId: Number(productId) },
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

function createProductComment(productId, content) {
  return prisma.productComment.create({
    data: {
      content,
      productId: Number(productId),
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

export const productCommentRepository = {
  findAllCommentsByProductId,
  createProductComment,
  updateProductComment,
  deleteProductComment,
};
