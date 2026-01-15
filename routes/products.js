import express from 'express';

export const productsRouter = express.Router();

// 메모리 DB
const products = [
  {
    id: 949,
    name: '등록테스트',
    description: '이미지 없을때',
    price: 11111,
    tags: ['ㅇㅇ'],
    images: [],
    ownerId: 1810,
    favoriteCount: 0,
    createdAt: '2025-12-13T17:00:43.770Z',
    updatedAt: '2025-12-13T17:00:43.770Z',
  },
  {
    id: 948,
    name: '드디어 완성이다.',
    description: '이제 디자인까지',
    price: 123456789,
    tags: ['한다', '정리'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/1810/1765645160201/search-item.png',
    ],
    ownerId: 1810,
    favoriteCount: 0,
    createdAt: '2025-12-13T16:59:20.343Z',
    updatedAt: '2025-12-13T16:59:20.343Z',
  },
  {
    id: 947,
    name: '12547',
    description: '34573547',
    price: 68568,
    tags: ['8'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/1810/1765645120440/hero-image2.png',
    ],
    ownerId: 1810,
    favoriteCount: 0,
    createdAt: '2025-12-13T16:58:40.587Z',
    updatedAt: '2025-12-13T16:58:40.587Z',
  },
  {
    id: 946,
    name: '로그인 회원가입 연동',
    description: '성공',
    price: 127001,
    tags: ['localhost'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/1810/1765644435824/hero-image2.png',
    ],
    ownerId: 1810,
    favoriteCount: 0,
    createdAt: '2025-12-13T16:47:28.407Z',
    updatedAt: '2025-12-13T16:47:28.407Z',
  },
  {
    id: 945,
    name: '야옹',
    description: 'string',
    price: 21,
    tags: ['21기', '스프린트', '화이팅'],
    images: ['https://i.imgur.com/MnOsOOe.gif'],
    ownerId: 1403,
    favoriteCount: 52,
    createdAt: '2025-12-08T19:13:17.364Z',
    updatedAt: '2025-12-08T19:15:15.554Z',
  },
  {
    id: 944,
    name: '냥냥',
    description: 'string',
    price: 21,
    tags: ['21기', '스프린트', '화이팅'],
    images: [
      'https://no-cdn.shortpixel.ai/client/to_avif,q_lossy,ret_wait/https://shortpixel.com/blog/wp-content/uploads/2023/12/nyan-cat.gif',
    ],
    ownerId: 1403,
    favoriteCount: 51,
    createdAt: '2025-12-08T19:08:09.361Z',
    updatedAt: '2025-12-08T19:14:49.312Z',
  },
  {
    id: 943,
    name: '고양이 마켓',
    description: 'string',
    price: 21,
    tags: ['21기', '스프린트', '화이팅'],
    images: ['https://loremflickr.com/600/400'],
    ownerId: 1403,
    favoriteCount: 50,
    createdAt: '2025-12-08T19:07:09.451Z',
    updatedAt: '2025-12-08T19:13:53.451Z',
  },
  {
    id: 941,
    name: '새벽 코딩용 청축 키보드',
    description:
      '타건음으로 내가 일하고 있음을 온 동네에 알리세요. 층간소음 항의는 책임지지 않습니다.',
    price: 102400,
    tags: ['관종', '기계식', '타건감'],
    images: ['https://robohash.org/mechanical_kb?set=set3&size=300x300'],
    ownerId: 1403,
    favoriteCount: 0,
    createdAt: '2025-12-08T18:46:19.685Z',
    updatedAt: '2025-12-08T18:46:19.685Z',
  },
  {
    id: 940,
    name: '내 컴에선 됨 스티커',
    description:
      'QA팀의 공격을 99% 확률로 방어합니다. Docker 컨테이너에는 붙이지 마세요.',
    price: 12700,
    tags: ['방어기제', '로컬호스트', '책임전가'],
    images: ['https://robohash.org/works_on_my_machine?set=set2&size=300x300'],
    ownerId: 1403,
    favoriteCount: 0,
    createdAt: '2025-12-08T18:46:19.628Z',
    updatedAt: '2025-12-08T18:46:19.628Z',
  },
  {
    id: 939,
    name: '금요일 배포 금지 부적',
    description:
      '금요일 오후 5시에 배포하려는 PM을 막아주는 부적. 주말 출근을 막아줍니다.',
    price: 50000,
    tags: ['미신', '서버다운', '워라밸지킴이'],
    images: ['https://robohash.org/deploy_talisman?set=set1&size=300x300'],
    ownerId: 1403,
    favoriteCount: 0,
    createdAt: '2025-12-08T18:46:19.628Z',
    updatedAt: '2025-12-08T18:46:19.628Z',
  },
];

// GET /products - 모든 상품 조회
productsRouter.get('/', (req, res) => {
  res.json({ success: true, data: products, count: products.length });
});

// GET /products/:id - 특정 상품 조회
productsRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id: id });
});

// POST /products - 새 상품 등록
productsRouter.post('/', (req, res) => {
  const { name, description, price, tags } = req.body;
  res.json({ message: '상품 등록됨', name, description, price, tags });
});

// PATCH /products/:id - 상품 정보 업데이트
productsRouter.patch('/:id', (req, res) => {
  res.json({ message: `상품 ${req.params.id} 업데이트` });
});

// DELETE /products/:id - 상품 삭제
productsRouter.delete('/:id', (req, res) => {
  res.json({ message: `상품 ${req.params.id} 삭제` });
});
