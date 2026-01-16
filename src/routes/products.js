import express from 'express';
import { Product } from '../models/product.model.js'

export const productRouter = express.Router();


//GET 상품 목록 조회  (페이지네이션, 정렬, 검색 추가..)
productRouter.get('/', (req, res) => {
  res.json({
  })
})

//GET 상품 상세 조회 
productRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ userId: id })
})

//POST 상품 등록 
productRouter.post('/', (req, res) => {
  const { name, description, price, tags } = req.body;
  res.json({})
})

//PATCH 상품 수정
productRouter.patch('/:id', (req, res) => {
  res.json({})
})

//DELETE 상품 삭제 
productRouter.delete('/:id', (req, res) => {
  res.json({})
})

