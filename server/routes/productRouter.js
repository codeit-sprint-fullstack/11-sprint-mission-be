import express from 'express';
import * as productController from '../controllers/product.controller.js';
import { validateProduct } from '../middleware/validator.middleware.js';

const router = express.Router();

router.get('/', productController.getProducts); // 목록 보기
router.post('/', validateProduct, productController.createProduct); // 유효성 검사 후 등록

router.get('/:id', productController.getProductById); // 상세 보기
router.patch('/:id', validateProduct, productController.updateProduct); // 유효성 검사 후 수정
router.delete('/:id', productController.deleteProduct); // 삭제

export default router;
