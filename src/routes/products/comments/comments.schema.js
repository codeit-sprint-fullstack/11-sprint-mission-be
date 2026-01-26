import { z } from 'zod';

// ID 파라미터 검증 스키마
export const productIdParamSchema = z.object({
   productId: z
    .string()
    .regex(/^[0-9A-HJKMNP-TV-Z]{26}$/, {
      message: '유효한 ULID 형식의 ID가 아닙니다.',
    }),
});

// 댓글 생성 스키마
export const createProductCommentSchema = z.object({
  content: z.string().min(1, '내용은 필수입니다.'),
});

// 커서 쿼리 스키마 
export const cursorQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).default(10),
  cursor: z.string().regex(/^[0-9A-HJKMNP-TV-Z]{26}$/, {
    message: '유효한 ULID 형식의 ID가 아닙니다.',
  }).optional()
});