// Prisma 에러 코드 상수
export const PRISMA_ERROR = {
  UNIQUE_CONSTRAINT: 'P2002',
  RECORD_NOT_FOUND: 'P2025',
};

// 에러 메시지 상수
export const ERROR_MESSAGE = {
  // 일반 에러 (Exception 기본값으로 사용)
  RESOURCE_NOT_FOUND: '리소스를 찾을 수 없습니다.',
  BAD_REQUEST: '잘못된 요청입니다.',
  RESOURCE_CONFLICT: '이미 존재하는 데이터입니다.',
  INTERNAL_SERVER_ERROR: '서버 내부 오류가 발생했습니다.',

  // 공통
  CONTENT_REQUIRED: '내용을 입력해주세요',
  
  // 상품 관련
  PRODUCT_NOT_FOUND: '상품을 찾을 수 없습니다.',
  // FAILED_TO_FETCH_PRODUCTS: '상품 목록을 불러올 수 없습니다.',
  // FAILED_TO_FETCH_PRODUCT: '상품을 불러올 수 없습니다.',
  // FAILED_TO_CREATE_PRODUCT: '상품을 생성할 수 없습니다.',
  // FAILED_TO_UPDATE_PRODUCT: '상품을 수정할 수 없습니다.',
  // FAILED_TO_DELETE_PRODUCT: '상품을 삭제할 수 없습니다.',


  // 게시글 관련
  ARTICLE_NOT_FOUND: '게시글을 찾을 수 없습니다.',
  TITLE_REQUIRED: '제목을 입력해주세요',
  // FAILED_TO_FETCH_ARTICLES: '게시글 목록을 불러올 수 없습니다.',
  // FAILED_TO_FETCH_ARTICLE: '게시글을 불러올 수 없습니다.',
  // FAILED_TO_CREATE_ARTICLE: '게시글을 생성할 수 없습니다.',
  // FAILED_TO_UPDATE_ARTICLE: '게시글을 수정할 수 없습니다.',
  // FAILED_TO_DELETE_ARTICLE: '게시글을 삭제할 수 없습니다.',

  // 댓글 관련
  COMMENT_NOT_FOUND: '댓글을 찾을 수 없습니다.',
  // FAILED_TO_FETCH_COMMENTS: '댓글 목록을 불러올 수 없습니다.',
  // FAILED_TO_FETCH_COMMENT: '댓글을 불러올 수 없습니다.',
  // FAILED_TO_CREATE_COMMENT: '댓글을 생성할 수 없습니다.',
  // FAILED_TO_UPDATE_COMMENT: '댓글을 수정할 수 없습니다.',
  // FAILED_TO_DELETE_COMMENT: '댓글을 삭제할 수 없습니다.',

  // Validation
  INVALID_INPUT: 'Invalid input',
  VALIDATION_FAILED: 'Validation failed',
};




//   FAILED_TO_FETCH_PUBLISHED_POSTS: 'Failed to fetch published posts',
//   FAILED_TO_FETCH_USER_WITH_POSTS: 'Failed to fetch user with posts',
//   FAILED_TO_DELETE_POST_WITH_COMMENTS: 'Failed to delete post with comments',
//   FAILED_TO_CREATE_POST_WITH_COMMENT: 'Failed to create post with comment',
//   FAILED_TO_CREATE_MULTIPLE_POSTS: 'Failed to create multiple posts',
//   POSTS_ARRAY_REQUIRED: 'Posts array is required',
//   INVALID_POSTS_ARRAY: 'Posts must be an array',

//   // Auth 관련
//   NO_AUTH_TOKEN: 'No authentication token provided',
//   INVALID_TOKEN: 'Invalid or expired token',
//   USER_NOT_FOUND_FROM_TOKEN: 'User not found from token',
//   AUTH_FAILED: 'Authentication failed',
//   INVALID_CREDENTIALS: 'Invalid email or password',
// };
