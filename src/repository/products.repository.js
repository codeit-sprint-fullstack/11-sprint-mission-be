import { prisma } from '#db/prisma.js';

//상품 등록
function createProduct(data) {
  return prisma.product.create({
    data,
  });
}

// 특정 상품 조회
function findProductById(id) {
  return prisma.product.findUnique({
    where: { id },
  });
}

// 상품 수정
function updateProduct(id, data) {
  return prisma.product.update({
    where: { id },
    data,
  });
}

//상품 삭제
function deleteProduct(id) {
  return prisma.product.delete({
    where: { id },
  });
}

// 상품 목록 조회
async function findProductsByFilter(
  page = 1, 
  pageSize = 10, 
  keyword = ''
) {
  const skip = (page - 1) * pageSize;
  const where = {
    ...(keyword?.trim() && {
      OR: [
        { name: { contains: keyword, mode: 'insensitive' } },
        { description: { contains: keyword, mode: 'insensitive' } },
      ],
    }),
  };
  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        price: true,
        createdAt: true,
      },
    }),
    prisma.product.count({ where }),
  ]);
  return {
    products,
    totalCount,
  };
}

export const productRepository = {
  createProduct,
  findProductById,
  updateProduct,
  deleteProduct,
  findProductsByFilter,
};
