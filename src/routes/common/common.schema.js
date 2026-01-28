import { z } from 'zod';
import { ERROR_MESSAGE } from '#constants';

// 페이지네이션 쿼리 스키마
export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive(ERROR_MESSAGE.INVALID_PAGE).default(1),
  limit: z.coerce
    .number()
    .int()
    .positive(ERROR_MESSAGE.INVALID_LIMIT)
    .max(100)
    .default(10),
});

// 검색 쿼리 스키마
export const searchQuerySchema = z.object({
  q: z.string().min(1, ERROR_MESSAGE.INVALID_SEARCH_QUERY),
});
