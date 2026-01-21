import { ConflictException } from "../errors/conflictException.js";
import ProductDbProduct from "../models/product.Schema.js";

async function getProductWithPagination(
  page = 1,
  limit = 10,
  orderBy = "recent",
  keyworld = "",
) {
  page = Number(page) || 1;
  limit = Number(limit) || 10;

  const skip = (page - 1) * limit;

  // 검색어, name,direction 기준
  const filter = keyworld
    ? {
        $or: [
          { name: { $regex: keyworld, $options: "i" } },
          { description: { $regex: keyworld, $options: "i" } },
        ],
      }
    : {};

  // 리스트 순서
  const sort = orderBy === "recent" ? { createdAt: -1 } : { createdAt: 1 };

  const [items, totalCount] = await Promise.all([
    ProductDbProduct.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select({
        _id: 1,
        name: 1,
        price: 1,
        description: 1,
        tags: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .lean(),
    ProductDbProduct.countDocuments(filter),
  ]);

  return {
    page,
    limit,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    items: items.map((p) => ({
      id: String(p._id),
      name: p.name,
      price: p.price,
      description: p.description,
      tags: p.tags,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    })),
  };
}

// 상품 등록시 이름 중복 체크
export async function assertNameNotExists(name, excludeId = null) {
  const filter = excludeId
    ? { name, _id: { $ne: excludeId } } // 자기 자신 제외
    : { name };

  const exists = await ProductDbProduct.exists(filter);
  if (exists) {
    throw new ConflictException("이미 존재하는 상품명입니다.");
  }
}

async function createProduct(data) {
  await assertNameNotExists(data.name);
  return await ProductDbProduct.create(data);
}

export const productRepository = {
  getProductWithPagination,
  createProduct,
  assertNameNotExists,
};
