import { z } from 'zod';
import mongoose from 'mongoose';

// ID 파라미터 검증 스키마
export const idParamSchema = z.object({
  id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: '유효한 MongoDB ObjectId가 아닙니다.',
  }),
});

// item 생성 스키마
export const createitemSchema = z.object({
  name: z.string().min(1, '상품명은 필수입니다.'),
  description: z.string().min(1, '상품설명은 필수입니다.'),
  price: z.number().positive('가격은 양수여야 합니다.'),
  tags: z.array(z.string()).min(1, '태그는 최소 1개 이상'),
});

// item 수정 스키마
export const updateitemSchema = z
  .object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    price: z.number().positive().optional(),
    tags: z.array(z.string()).min(1).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: '수정할 값이 최소 1개는 필요합니다.',
  });
