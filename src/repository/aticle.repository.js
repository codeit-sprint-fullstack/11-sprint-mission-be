import { prisma } from '#db/prisma.js';

// 아티클 생성
function createArticle(data) {
  return prisma.article.create({
    data,
  });
}

//특정 아티클 조회
function findArticleById(id) {
  return prisma.article.findUnique({
    where: { id },
  });
}

// 아티클 정보 수정
function updateArticle(id, data) {
  return prisma.article.update({
    where: { id },
    data,
  });
}

// 아티클 정보 삭제
function deleteArticle(id) {
  return prisma.article.delete({
    where: { id },
  });
}

//모든 아티클 조회 및 페이지네이션 하나로
async function findArticlePaged({
  page = 1,
  limit = 10,
  keyword = '',
  sort = 'recent',
}) {
  const take = Number(limit);
  const skip = Number(page - 1) * take;

  const where = keyword
    ? {
        OR: [
          { title: { contains: keyword, mode: 'insensitive' } },
          { content: { contains: keyword, mode: 'insensitive' } },
        ],
      }
    : undefined;

  const orderBy = { createdAt: sort === 'recent' ? 'desc' : 'asc' };

  const [items, totalCount] = await Promise.all([
    prisma.article.findMany({
      skip,
      take,
      where,
      orderBy,
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.article.count({ where }),
  ]);

  return { items, totalCount };
}

export const articleRepository = {
  createArticle,
  findArticleById,
  updateArticle,
  deleteArticle,
  findArticlePaged,
};
