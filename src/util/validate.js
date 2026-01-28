import { BadRequestException } from '../errors/badRequestException.js';
// UUID 형식 검증 함수
const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const validateUUID = (id) => {
  if (!uuidRegex.test(id)) {
    throw new BadRequestException('잘못된 ID 형식입니다');
  }
};
