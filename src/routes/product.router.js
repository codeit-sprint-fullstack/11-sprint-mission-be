import express from "express";
import { productRepository } from "#repository";
import { asyncHandler } from "../util/asyncHandler.js";
import { BadRequestException } from "../errors/badRequestException.js";
import ProductDbProduct from "../models/product.Schema.js";
import { NotFoundException } from "../errors/notFoundException.js";
export const productRouter = express.Router();
import mongoose from "mongoose";

/**
 * @swagger
 * /products:
 *   get:
 *     summary: 상품 목록 조회
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *           maximum: 100
 *         description: 페이지당 개수
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum:
 *             - recent
 *             - old
 *           default: recent
 *         description: recent=최신순, old=오래된순
 *       - in: query
 *         name: keyworld
 *         schema:
 *           type: string
 *         description: name 또는 description 포함 검색어
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 value:
 *                   page: 1
 *                   limit: 10
 *                   totalCount: 2
 *                   totalPages: 1
 *                   items:
 *                     - id: "65a1b2c3d4e5f6a7b8c9d0e1"
 *                       name: "상품A"
 *                       price: 10000
 *                       tags:
 *                         - "테크1"
 *                       createdAt: "2026-01-18T09:00:00.000Z"
 *                       updatedAt: "2026-01-18T09:00:00.000Z"
 *                     - id: "65a1b2c3d4e5f6a7b8c9d0e2"
 *                       name: "상품B"
 *                       price: 20000
 *                       tags:
 *                         - "테크2"
 *                       createdAt: "2026-01-17T09:00:00.000Z"
 *                       updatedAt: "2026-01-17T09:00:00.000Z"
 *       400:
 *         description: "실패 - 잘못된 요청 (예: orderBy 오류)"
 *         content:
 *           application/json:
 *             examples:
 *               invalidOrderBy:
 *                 value:
 *                   success: false
 *                   message: "orderBy가 올바르지 않습니다."
 *       500:
 *         description: 실패 - 서버 오류
 *         content:
 *           application/json:
 *             examples:
 *               serverError:
 *                 value:
 *                   success: false
 *                   message: "Internal Server Error"
 */

productRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const { page, limit, orderBy, keyworld } = req.query;

    if (orderBy && orderBy !== "recent" && orderBy !== "old") {
      throw new BadRequestException("orderBy가 올바르지 않습니다.");
    }

    const result = await productRepository.getProductWithPagination(
      page,
      limit,
      orderBy,
      keyworld,
    );

    res.json(result);
  }),
);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: 상품 상세 조회
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 상품 ID
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 value:
 *                   success: true
 *                   data:
 *                     _id: "696ca9259ca162848bfecafa"
 *                     name: "카드지갑"
 *                     description: "슬림한 카드지갑 입니다"
 *                     price: 17000
 *                     tags:
 *                       - "지갑"
 *                       - "가죽"
 *                     createdAt: "2026-01-15T10:00:00.000Z"
 *                     updatedAt: "2026-01-15T10:00:00.000Z"
 *       404:
 *         description: 실패 - 상품을 찾을 수 없음
 *         content:
 *           application/json:
 *             examples:
 *               notFound:
 *                 value:
 *                   success: false
 *                   message: "상품을 찾을 수 없습니다."
 *       500:
 *         description: 실패 - 서버 오류
 *         content:
 *           application/json:
 *             examples:
 *               serverError:
 *                 value:
 *                   success: false
 *                   message: "Internal Server Error"
 */

productRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException("상품을 찾을 수 없습니다.");
    }

    const produtItem = await ProductDbProduct.findById(id).select("-__v");

    if (!produtItem) {
      throw new NotFoundException("상품을 찾을 수 없습니다.");
    }

    res.json({ success: true, data: produtItem });
  }),
);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: 상품 등록
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - tags
 *             properties:
 *               name:
 *                 type: string
 *                 example: "카드지갑"
 *               description:
 *                 type: string
 *                 example: "슬림한 카드지갑 입니다"
 *               price:
 *                 type: number
 *                 example: 17000
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - "지갑"
 *                   - "가죽"
 *     responses:
 *       201:
 *         description: 생성 성공
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 value:
 *                   success: true
 *                   message: "상품이 등록되엇습니다."
 *                   data:
 *                     _id: "696ca9259ca162848bfecafa"
 *                     name: "카드지갑"
 *                     description: "슬림한 카드지갑 입니다"
 *                     price: 17000
 *                     tags:
 *                       - "지갑"
 *                       - "가죽"
 *                     createdAt: "2026-01-15T10:00:00.000Z"
 *                     updatedAt: "2026-01-15T10:00:00.000Z"
 *       400:
 *         description: "실패 - 잘못된 요청 (검증 오류)"
 *         content:
 *           application/json:
 *             examples:
 *               badRequest:
 *                 value:
 *                   success: false
 *                   message: "BAD_REQUEST"
 *       409:
 *         description: "실패 - 충돌 (상품명 중복)"
 *         content:
 *           application/json:
 *             examples:
 *               conflict:
 *                 value:
 *                   success: false
 *                   message: "이미 존재하는 상품명입니다."
 *       500:
 *         description: 실패 - 서버 오류
 *         content:
 *           application/json:
 *             examples:
 *               serverError:
 *                 value:
 *                   success: false
 *                   message: "Internal Server Error"
 */

productRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const newItem = await productRepository.createProduct(req.body);
    res.status(201).json({
      success: true,
      data: newItem,
      message: "상품이 등록되엇습니다.",
    });
  }),
);

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: 상품 수정
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 상품 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "카드지갑(수정)"
 *               description:
 *                 type: string
 *                 example: "더 슬림한 카드지갑 입니다"
 *               price:
 *                 type: number
 *                 example: 18000
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - "지갑"
 *                   - "가죽"
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 value:
 *                   success: true
 *                   data:
 *                     _id: "696ca9259ca162848bfecafa"
 *                     name: "카드지갑(수정)"
 *                     description: "더 슬림한 카드지갑 입니다"
 *                     price: 18000
 *                     tags:
 *                       - "지갑"
 *                       - "가죽"
 *                     createdAt: "2026-01-15T10:00:00.000Z"
 *                     updatedAt: "2026-01-21T10:00:00.000Z"
 *       400:
 *         description: "실패 - 잘못된 요청 (검증 오류)"
 *         content:
 *           application/json:
 *             examples:
 *               badRequest:
 *                 value:
 *                   success: false
 *                   message: "BAD_REQUEST"
 *       404:
 *         description: "실패 - 상품을 찾을 수 없음"
 *         content:
 *           application/json:
 *             examples:
 *               notFound:
 *                 value:
 *                   success: false
 *                   message: "상품을 찾을 수 없습니다."
 *       409:
 *         description: "실패 - 충돌 (상품명 중복)"
 *         content:
 *           application/json:
 *             examples:
 *               conflict:
 *                 value:
 *                   success: false
 *                   message: "이미 존재하는 상품명입니다."
 *       500:
 *         description: 실패 - 서버 오류
 *         content:
 *           application/json:
 *             examples:
 *               serverError:
 *                 value:
 *                   success: false
 *                   message: "Internal Server Error"
 */

productRouter.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    // id 형식 틀리면 NotFound로 통일
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException("상품을 찾을 수 없습니다.");
    }

    // body값의 name이 있다면 중복 체크
    if (req.body.name) {
      await productRepository.assertNameNotExists(req.body.name, id);
    }

    // runValidators: true -> 업데이트할 때도 스키마 규칙(최대길이, 최소길이, min, 커스텀 validator 등)
    // 검사해서 이상하면 저장을 막음.
    const updated = await ProductDbProduct.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).select("-__v");

    if (!updated) {
      throw new NotFoundException("상품을 찾을 수 없습니다.");
    }

    res.json({ success: true, data: updated });
  }),
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: 상품 삭제
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 상품 ID
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 value:
 *                   success: true
 *                   message: "상품이 삭제 되엇습니다."
 *                   data:
 *                     _id: "696ca9259ca162848bfecafa"
 *                     name: "카드지갑"
 *                     description: "슬림한 카드지갑 입니다"
 *                     price: 17000
 *                     tags:
 *                       - "지갑"
 *                       - "가죽"
 *                     createdAt: "2026-01-15T10:00:00.000Z"
 *                     updatedAt: "2026-01-15T10:00:00.000Z"
 *       404:
 *         description: "실패 - 상품을 찾을 수 없음"
 *         content:
 *           application/json:
 *             examples:
 *               notFound:
 *                 value:
 *                   success: false
 *                   message: "상품을 찾을 수 없습니다."
 *       500:
 *         description: 실패 - 서버 오류
 *         content:
 *           application/json:
 *             examples:
 *               serverError:
 *                 value:
 *                   success: false
 *                   message: "Internal Server Error"
 */

productRouter.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    // id 형식 틀리면 NotFound로 통일
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException("상품을 찾을 수 없습니다.");
    }

    const deleteItem = await ProductDbProduct.findByIdAndDelete(id);
    if (!deleteItem) {
      throw new NotFoundException("상품을 찾을 수 없습니다.");
    }
    res.json({
      success: true,
      message: "상품이 삭제 되엇습니다.",
      data: deleteItem,
    });
  }),
);
