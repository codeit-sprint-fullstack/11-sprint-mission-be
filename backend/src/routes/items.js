import express from 'express';

export const itemRouter = express.Router();

const ITEMS = [
  {
    id: 1,
    name: '아이폰 15',
    description: '애플 스마트폰',
    price: 1500000,
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 2,
    name: '갤럭시 S24',
    description: '삼성 스마트폰',
    price: 1400000,
    createdAt: new Date('2024-01-12'),
  },
];

itemRouter.get('/', (req, res) => {
  const items = ITEMS.map(({ id, name, price, createdAt }) => ({
    id,
    name,
    price,
    createdAt,
  }));

  res.json({ items });
});

itemRouter.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  res.json({
    id,
    name: '상품',
    description: '상품 설명',
    price: 10000,
    tags: ['태그'],
    createdAt: new Date(),
  });
});

itemRouter.post('/', (req, res) => {
  const { name, description, price, tags } = req.body;

  res.json({
    message: '상품 생성됨',
    name,
    description,
    price: Number(price),
    tags,
  });
});

itemRouter.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  res.json({
    message: `상품 ${id} 업데이트`,
  });
});

itemRouter.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  res.json({
    message: `상품 ${id} 삭제`,
  });
});
