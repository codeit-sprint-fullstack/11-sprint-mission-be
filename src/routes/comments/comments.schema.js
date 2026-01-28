import { z } from 'zod';
import { ERROR_MESSAGE } from '#constants';

// 댓글 ID 파라미터 검증 스키마
export const commentIdParamSchema = z.object({
  id: z.string().min(1, ERROR_MESSAGE.COMMENT_ID_REQUIRED),
});

// 댓글 생성 스키마
export const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, ERROR_MESSAGE.COMMENT_CONTENT_REQUIRED)
    .max(200, ERROR_MESSAGE.COMMENT_CONTENT_TOO_LONG),
});

// 댓글 수정 스키마
export const updateCommentSchema = createCommentSchema.partial();
