import { z } from 'zod';

// ID 파라미터 검증 스키마
export const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^[0-9A-HJKMNP-TV-Z]{26}$/, {
      message: '유효한 ULID 형식의 ID가 아닙니다.',
    }),
});

// 페이지네이션, 검색 쿼리 스키마
export const ListQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(10),
  keyword: z.string().min(1, '검색어를 입력해주세요.').optional(),
});

// 게시글 생성 스키마
export const createArticleSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다.'),
  content: z.string().min(1, '내용은 필수입니다.'),
});

//게시글 수정 스키마
export const updateArticleSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다.'),
  content: z.string().min(1, '내용은 필수입니다.'),
});
