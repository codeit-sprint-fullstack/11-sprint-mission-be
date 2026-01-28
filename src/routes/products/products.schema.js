import { z } from 'zod';
import { ERROR_MESSAGE } from '#constants';

// 상품 ID 파라미터 검증 스키마
export const productIdParamSchema = z.object({
  id: z.string().min(1, ERROR_MESSAGE.PRODUCT_ID_REQUIRED),
});

// 상품 생성 스키마
export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, ERROR_MESSAGE.PRODUCT_NAME_TOO_SHORT)
    .max(10, ERROR_MESSAGE.PRODUCT_NAME_TOO_LONG),
  description: z
    .string()
    .min(1, ERROR_MESSAGE.PRODUCT_DESCRIPTION_TOO_SHORT)
    .max(100, ERROR_MESSAGE.PRODUCT_DESCRIPTION_TOO_LONG),
   price: z.coerce.number().positive(ERROR_MESSAGE.PRODUCT_PRICE_INVALID),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string().url()).optional(),
});

// 상품 수정 스키마
export const updateProductSchema = z.object({
  name: z
    .string()
    .min(1, ERROR_MESSAGE.PRODUCT_DESCRIPTION_TOO_SHORT)
    .max(10, ERROR_MESSAGE.PRODUCT_DESCRIPTION_TOO_LONG).optional(),
  description: z
    .string()
    .min(1, ERROR_MESSAGE.PRODUCT_DESCRIPTION_TOO_SHORT)
    .max(100, ERROR_MESSAGE.PRODUCT_DESCRIPTION_TOO_LONG).optional(),
   price: z.coerce.number().positive(ERROR_MESSAGE.PRODUCT_PRICE_INVALID).optional(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string().url()).optional(),
});