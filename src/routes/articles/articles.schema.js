import { z } from 'zod';
import { ERROR_MESSAGE } from '#constants';

// 게시글 ID 파라미터 검증 스키마
export const articleIdParamSchema = z.object({
  id: z.string().min(1, ERROR_MESSAGE.ARTICLE_ID_REQUIRED),
});

// 게시글 생성 스키마
export const createArticleSchema = z.object({
  title: z
    .string()
    .min(2, ERROR_MESSAGE.ARTICLE_TITLE_TOO_SHORT)
    .max(20, ERROR_MESSAGE.ARTICLE_TITLE_TOO_LONG),
  content: z
    .string()
    .min(1, ERROR_MESSAGE.ARTICLE_CONTENT_TOO_SHORT)
    .max(500, ERROR_MESSAGE.ARTICLE_CONTENT_TOO_LONG),
});

// 게시글 수정 스키마
export const updateArticleSchema = z.object({
  title: z
    .string()
    .min(2, ERROR_MESSAGE.ARTICLE_TITLE_TOO_SHORT)
    .max(20, ERROR_MESSAGE.ARTICLE_TITLE_TOO_LONG)
    .optional(),
  content: z
    .string()
    .min(1, ERROR_MESSAGE.ARTICLE_CONTENT_TOO_SHORT)
    .max(500, ERROR_MESSAGE.ARTICLE_CONTENT_TOO_LONG)
    .optional(),
});
