// Prisma 에러 코드 상수
export const PRISMA_ERROR = {
  UNIQUE_CONSTRAINT: 'P2002',
  RECORD_NOT_FOUND: 'P2025',
};

// 에러 메시지 상수
export const ERROR_MESSAGE = {
  // User 관련
  USER_NOT_FOUND: 'User not found',
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  FAILED_TO_FETCH_USERS: 'Failed to fetch users',
  FAILED_TO_FETCH_USER: 'Failed to fetch user',
  FAILED_TO_CREATE_USER: 'Failed to create user',
  FAILED_TO_UPDATE_USER: 'Failed to update user',
  FAILED_TO_DELETE_USER: 'Failed to delete user',

  // PRODUCT 관련
  PRODUCT_NOT_FOUND: 'Product not found',
  TITLE_REQUIRED: 'Title is required',
  AUTHOR_ID_REQUIRED: 'Author ID is required',
  SEARCH_QUERY_REQUIRED: 'Search query is required',
  FAILED_TO_FETCH_PRODUCTS: 'Failed to fetch products',
  FAILED_TO_FETCH_PRODUCT: 'Failed to fetch product',
  FAILED_TO_CREATE_PRODUCT: 'Failed to create product',
  FAILED_TO_UPDATE_PRODUCT: 'Failed to update product',
  FAILED_TO_DELETE_PRODUCT: 'Failed to delete product',
  FAILED_TO_SEARCH_PRODUCTS: 'Failed to search products',
  FAILED_TO_FETCH_PUBLISHED_PRODUCTS: 'Failed to fetch published products',
  FAILED_TO_FETCH_USER_WITH_PRODUCTS: 'Failed to fetch user with products',
  FAILED_TO_DELETE_PRODUCT_WITH_COMMENTS: 'Failed to delete product with comments',
  FAILED_TO_CREATE_PRODUCT_WITH_COMMENT: 'Failed to create product with comment',
  FAILED_TO_CREATE_MULTIPLE_PRODUCTS: 'Failed to create multiple products',
  PRODUCTS_ARRAY_REQUIRED: 'Products array is required',
  INVALID_PRODUCTS_ARRAY: 'Products must be an array',


  // Validation
  INVALID_INPUT: 'Invalid input',
  VALIDATION_FAILED: 'Validation failed',

  // 일반 에러 (Exception 기본값으로 사용)
  RESOURCE_NOT_FOUND: '리소스를 찾을 수 없습니다.',
  BAD_REQUEST: '잘못된 요청입니다.',
  RESOURCE_CONFLICT: '이미 존재하는 데이터입니다.',
  INTERNAL_SERVER_ERROR: '서버 내부 오류가 발생했습니다.',
};
