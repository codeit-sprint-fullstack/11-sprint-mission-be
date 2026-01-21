// 에러 메시지 상수
export const ERROR_MESSAGE = {
  // item 관련
  ITEM_NOT_FOUND: 'Item not found',
  NAME_REQUIRED: 'name is required',
  SEARCH_QUERY_REQUIRED: 'Search query is required',
  FAILED_TO_FETCH_ITEMS: 'Failed to fetch items',
  FAILED_TO_FETCH_ITEM: 'Failed to fetch item',
  FAILED_TO_CREATE_ITEM: 'Failed to create item',
  FAILED_TO_UPDATE_ITEM: 'Failed to update item',
  FAILED_TO_DELETE_ITEM: 'Failed to delete item',
  FAILED_TO_SEARCH_ITEM: 'Failed to search item',

  // Validation
  INVALID_INPUT: 'Invalid input',
  VALIDATION_FAILED: 'Validation failed',

  // 일반 에러 (Exception 기본값으로 사용)
  RESOURCE_NOT_FOUND: '리소스를 찾을 수 없습니다.',
  BAD_REQUEST: '잘못된 요청입니다.',
  INTERNAL_SERVER_ERROR: '서버 내부 오류가 발생했습니다.',
};
