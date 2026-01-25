// Prisma 에러 코드 상수
export const PRISMA_ERROR = {
  UNIQUE_CONSTRAINT: 'P2002', 
  RECORD_NOT_FOUND: 'P2025',  
};

// 에러 메시지 상수
export const ERROR_MESSAGE = {
  // Article
  ARTICLE_NOT_FOUND: 'Article not found',
  ARTICLE_TITLE_REQUIRED: 'Article title is required',
  ARTICLE_CONTENT_REQUIRED: 'Article content is required',
  FAILED_TO_FETCH_ARTICLES: 'Failed to fetch articles',
  FAILED_TO_FETCH_ARTICLE: 'Failed to fetch article',
  FAILED_TO_CREATE_ARTICLE: 'Failed to create article',
  FAILED_TO_UPDATE_ARTICLE: 'Failed to update article',
  FAILED_TO_DELETE_ARTICLE: 'Failed to delete article',

  // Product
  PRODUCT_NOT_FOUND: 'Product not found',
  PRODUCT_NAME_REQUIRED: 'Product name is required',
  PRODUCT_DESCRIPTION_REQUIRED: 'Product description is required',
  FAILED_TO_FETCH_PRODUCTS: 'Failed to fetch products',
  FAILED_TO_FETCH_PRODUCT: 'Failed to fetch product',
  FAILED_TO_CREATE_PRODUCT: 'Failed to create product',
  FAILED_TO_UPDATE_PRODUCT: 'Failed to update product',
  FAILED_TO_DELETE_PRODUCT: 'Failed to delete product',

  // Comment
  COMMENT_NOT_FOUND: 'Comment not found',
  COMMENT_CONTENT_REQUIRED: 'Comment content is required',
  FAILED_TO_FETCH_COMMENTS: 'Failed to fetch comments',
  FAILED_TO_CREATE_COMMENT: 'Failed to create comment',
  FAILED_TO_UPDATE_COMMENT: 'Failed to update comment',
  FAILED_TO_DELETE_COMMENT: 'Failed to delete comment',

  // Validation
  INVALID_INPUT: 'Invalid input',
  VALIDATION_FAILED: 'Validation failed',

  // 일반 에러 
  RESOURCE_NOT_FOUND: '리소스를 찾을 수 없습니다.',
  BAD_REQUEST: '잘못된 요청입니다.',
  RESOURCE_CONFLICT: '이미 존재하는 데이터입니다.',
  INTERNAL_SERVER_ERROR: '서버 내부 오류가 발생했습니다.',
};