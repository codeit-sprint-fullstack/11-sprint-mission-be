// Prisma 에러 코드 상수
export const PRISMA_ERROR = {
  UNIQUE_CONSTRAINT: 'P2002', // Unique constraint 위반
  RECORD_NOT_FOUND: 'P2025', // 레코드를 찾을 수 없음
};

// 에러 메세지 상수
export const ERROR_MESSAGE = {
  // Product
  PRODUCT_NOT_FOUND: 'Product not found',
  PRODUCT_ID_REQUIRED: 'Product ID is required',
  PRODUCT_NAME_REQUIRED: 'Product name is required',
  PRODUCT_NAME_TOO_SHORT: 'Product name must be at least 1 character',
  PRODUCT_NAME_TOO_LONG: 'Product name must be at most 10 characters',
  PRODUCT_DESCRIPTION_REQUIRED: 'Product description is required',
  PRODUCT_DESCRIPTION_TOO_SHORT:
    'Product description must be at least 10 characters',
  PRODUCT_DESCRIPTION_TOO_LONG:
    'Product description must be at most 100 characters',
  PRODUCT_PRICE_REQUIRED: 'Product price is required',
  PRODUCT_PRICE_INVALID: 'Product price must be a positive number',
  PRODUCT_TAG_TOO_LONG: 'Product tag must be at most 5 characters',
  FAILED_TO_FETCH_PRODUCTS: 'Failed to fetch products',
  FAILED_TO_CREATE_PRODUCT: 'Failed to create product',
  FAILED_TO_UPDATE_PRODUCT: 'Failed to update product',
  FAILED_TO_DELETE_PRODUCT: 'Failed to delete product',

  // Article
  ARTICLE_NOT_FOUND: 'Article not found',
  ARTICLE_ID_REQUIRED: 'Article ID is required',
  ARTICLE_TITLE_REQUIRED: 'Article title is required',
  ARTICLE_TITLE_TOO_SHORT: 'Article title must be at least 2 characters',
  ARTICLE_TITLE_TOO_LONG: 'Article title must be at most 20 characters',
  ARTICLE_CONTENT_REQUIRED: 'Article content is required',
  ARTICLE_CONTENT_TOO_SHORT: 'Article content must be at least 1 character',
  ARTICLE_CONTENT_TOO_LONG: 'Article content must be at most 500 characters',
  FAILED_TO_FETCH_ARTICLES: 'Failed to fetch articles',
  FAILED_TO_CREATE_ARTICLE: 'Failed to create article',
  FAILED_TO_UPDATE_ARTICLE: 'Failed to update article',
  FAILED_TO_DELETE_ARTICLE: 'Failed to delete article',

  // Comment
  COMMENT_NOT_FOUND: 'Comment not found',
  COMMENT_ID_REQUIRED: 'Comment ID is required',
  COMMENT_CONTENT_REQUIRED: 'Comment content is required',
  COMMENT_CONTENT_TOO_LONG: 'Comment content must be at most 200 characters',
  FAILED_TO_FETCH_COMMENTS: 'Failed to fetch comments',
  FAILED_TO_CREATE_COMMENT: 'Failed to create comment',
  FAILED_TO_UPDATE_COMMENT: 'Failed to update comment',
  FAILED_TO_DELETE_COMMENT: 'Failed to delete comment',

  // Pagination / Validation
  INVALID_INPUT: 'Invalid input',
  VALIDATION_FAILED: 'Validation failed',
  INVALID_PAGE: 'Page must be a number greater than or equal to 1',
  INVALID_LIMIT: 'Limit must be a number greater than or equal to 1',
  INVALID_SEARCH_QUERY: 'Search query is required',

  // General
  NOT_FOUND: 'Resource not found',
  BAD_REQUEST: 'Bad request',
  RESOURCE_CONFLICT: 'Resource already exists',
  INTERNAL_SERVER_ERROR: 'Internal server error',
};
