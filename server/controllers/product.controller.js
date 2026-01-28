// 요청/응답 처리

import { ProductService } from '../services/product.service.js';

const productService = new ProductService();

export const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSige = Number(req, query.pageSige) || 1;
    const orderBy = req.query.orderBy || 'recent';
    const keyword = req.query.keyword || '';

    const result = await productService.getProducts({
      page,
      pageSize,
      orderBy,
      keyword,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.is);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
