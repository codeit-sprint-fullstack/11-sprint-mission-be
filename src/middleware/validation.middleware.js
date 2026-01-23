// 유효성 검사

import { BadRequestException } from '../errors/httpException.js';

export const validateProduct = (req, res, next) => {
  const { name, description, price, tags } = req.body;

  // 1. 이름 검사
  if (req.method === 'POST' || name) {
    if (!name || name.trim() === '') {
      return next(new BadRequestException('이름은 필수입니다.'));
    }
  }

  // 2. 설명 검사
  if (req.method === 'POST' || description) {
    if (!description || description.trim() === '') {
      return next(new BadRequestException('설명은 필수입니다.'));
    }
  }

  // 3. 가격 검사
  if (req.method === 'POST' || price) {
    if (!price || price <= 0) {
      return next(new BadRequestException('가격은 0보다 커야 합니다.'));
    }
  }

  // 통과
  next();
};
