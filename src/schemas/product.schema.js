import { z } from 'zod';

export const createProductSchema = z.object({
  name: z
    .string({ required_error: '상품명은 필수입니다.' })
    .min(1, '상품명은 1자 이상이어야 합니다.')
    .max(10, '상품명은 10자 이내여야 합니다.'),

  description: z
    .string({ required_error: '상품 소개는 필수입니다.' })
    .min(10, '상품 소개는 10자 이상이어야 합니다.')
    .max(100, '상품 소개는 100자 이내여야 합니다.'),

  price: z
    .number({
      required_error: '판매 가격은 필수입니다.',
      invalid_type_error: '숫자가 들어가야 합니다.',
    })
    .min(0, '가격은 0원 이상이어야 합니다.'),

  tags: z.array(z.string().max(5, '태그는 5글자 이내여야 합니다.')).optional(),
});
