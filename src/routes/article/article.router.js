import express from 'express';
import { articleRepository } from '#repository';
import { NotFoundException } from '../../errors/notFoundException.js';
import { BadRequestException } from '../../errors/badRequestException.js';
import { validateUUID } from '../../util/validate.js';

export const articleRouter = express.Router();

//get /article
articleRouter.get('/', async (req, res) => {
  const { page, limit, keyword, sort } = req.query;
  console.log(page, limit, keyword, sort);
  const article = await articleRepository.findArticlePaged({
    page,
    limit,
    keyword,
    sort,
  });
  if (!article) {
    throw new NotFoundException('게시글을 찾을 수 없습니다');
  }

  res.json(article);
});

//post /article/create
articleRouter.post('/create', async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    throw new BadRequestException('title, content는 필수입니다.');
  }

  const article = await articleRepository.createArticle({ title, content });
  res.status(201).json({
    success: true,
    data: article,
    message: '게시글이 등록되엇습니다.',
  });
});

//get /article/:id
articleRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  // UUID 형식 검증
  if (!validateUUID(id)) {
    throw new BadRequestException('잘못된 ID 형식입니다');
  }

  const articleItem = await articleRepository.findArticleById(id);

  if (!articleItem) {
    throw new NotFoundException('게시글을 찾을 수 없습니다.');
  }
  res.json({ success: true, data: articleItem });
});

//PATCH /article/patch/:id
articleRouter.patch('/patch/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    throw new BadRequestException('title 또는 content는 필수입니다.');
  }

  // UUID 형식 검증
  if (!validateUUID(id)) {
    throw new BadRequestException('잘못된 ID 형식입니다');
  }

  const articleUpdate = await articleRepository.updateArticle(id, req.body);

  res.json({ success: true, data: articleUpdate });
});

//DELETE /article/delete/:id
articleRouter.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  // UUID 형식 검증
  if (!validateUUID(id)) {
    throw new BadRequestException('잘못된 ID 형식입니다');
  }

  const deleteArticleItem = await articleRepository.deleteArticle(id);

  if (!deleteArticleItem) {
    throw new NotFoundException('게시글을 찾을 수 없습니다.');
  }
  res.json({
    success: true,
    message: '게시글이 삭제 되엇습니다.',
    data: deleteArticleItem,
  });
});
