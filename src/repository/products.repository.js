import { prisma } from '#db/prisma.js';

function createProduct(data) {
  return prisma.product.create({ data });
}

function findProductById(id) {
  return prisma.product.findUnique({
    where: { id },
  });
}

function findAllProducts() {
  return prisma.product.findMany();
}

function updateProduct(id, data) {
  return prisma.product.update({
    where: { id },
    data,
  });
}

function deleteProduct(id) {
  return prisma.product.delete({
    where: { id },
  });
}

// 상품과 댓글 함께 조회
function findProductWithCommnets(id) {
  return prisma.product.findUnique({
    where: { id },
    include: { comments: true },
  });
}

// 모든 상품과 댓글 함께 조회
function findAllProductsWithCommnets() {
  return prisma.product.findMany({
    include: { comments: true },
  });
}

// 검색 + 페이지네이션
async function getProducts({ search, page = 1, limit = 10 }) {
  const safePage = Number(page);
  const safeLimit = Number(limit);

  const skip = (safePage - 1) * safeLimit;

  const where = search
    ? {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive', // 대소문자 구별 x
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      }
    : {};

  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: safeLimit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products,
    pagination: {
      currentPage: safePage,
      totalPages: Math.ceil(totalCount / safeLimit),
      totalCount,
      hasNext: safePage < Math.ceil(totalCount / safeLimit),
      hasPrev: safePage > 1,
    },
  };
}

export const productsRepository = {
  createProduct,
  findProductById,
  findAllProducts,
  updateProduct,
  deleteProduct,
  findProductWithCommnets,
  findAllProductsWithCommnets,
  getProducts,
};
