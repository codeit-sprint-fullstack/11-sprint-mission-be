import { prisma } from '#db/prisma.js';

// 상품 등록
function createProduct(data) {
  return prisma.product.create({
    data,
  });
}

// 특정 상품 상세 조회
function findProductById(id) {
  return prisma.product.findUnique({
    where: { id: id },
  });
}

// 상품 목록 조회 (페이지네이션, 정렬, 검색 포함)
function findAllProducts({ skip, take, orderBy, keyword }) {
  const where = keyword
    ? {
        OR: [
          { name: { contains: keyword, mode: 'insensitive' } },
          { description: { contains: keyword, mode: 'insensitive' } },
        ],
      }
    : {};

  return prisma.product.findMany({
    where,
    orderBy: {
      createdAt: orderBy === 'recent' ? 'dest' : 'asc',
    },
    skip: Number(skip) || 0,
    take: Number(take) || 0,
  });
}

// 상품 정보 수정
function updateProduct(id, data) {
  return prisma.product.update({
    where: { id: id },
    data,
  });
}

// 상품 삭제
function deleteProduct(id) {
  return prisma.product.delete({
    where: { id: id },
  });
}

export const postRepository = {
  createProduct,
  findProductById,
  findAllProducts,
  updateProduct,
  deleteProduct,
};
