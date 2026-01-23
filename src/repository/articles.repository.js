import { prisma } from "#db/prisma.js";

//게시글 생성 
function creatArticle(data) {
  return prisma.article.create({
    data,
  })
}

// 특정 게시글 조회 
function findArticleId(id) {
  return prisma.article.findUnique({
    where: { id },
  });
}

// 모든 게시글 조회 
function findAllArticles() {
 return prisma.article.findMany();
}

// 특정 게시글 수정 
function find