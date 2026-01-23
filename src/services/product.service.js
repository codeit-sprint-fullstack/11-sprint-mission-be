// 비지니스 로직

import { NotFoundException } from '../errors/httpException.js';
import { Product } from '../models/product.model.js';

export class ProductService {
  // 1. 상품 만들기
  async createProduct(data) {
    const newProduct = await Product.create(data);
    return newProduct;
  }

  // 2. 상품 목록 가져오기 (페이지, 정렬, 검색)
  async getProducts({ page, pageSize, orderBy, keyword }) {
    // 검색 조건
    const searchOption = {
      $or: [
        { name: new RegExp(keyword, 'i') },
        { description: new RegExp(keyword, 'i') },
      ],
    };
    // 정렬 조건
    const sortOption = orderBy === 'recent' ? { createdAt: -1 } : {};

    const list = await Product.find(searchOption)
      .sort(sortOption)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const totalCount = await Product.countDocuments(searchOption);
    return { list, totalCount };
  }

  // 3. 상품 조회(1개)
  async getProductById(id) {
    const product = await Product.findById(id);

    if (!product) {
      throw new NotFoundException('상품을 찾을 수 없습니다.');
    }
    return product;
  }

  // 4. 상품 수정
  async updateProduct(id, data) {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    if (!product) {
      throw new NotFoundException('수정할 상품이 없습니다.');
    }
    return product;
  }

  // 5. 상품 삭제
  async deleteProduct(id) {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      throw new NotFoundException('삭제할 상품이 없습니다.');
    }
    return product;
  }
}
