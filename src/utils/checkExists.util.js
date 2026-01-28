import { NotFoundException } from '#exceptions';

export function checkExists(entity, notFoundMessage) {
  if (!entity) {
    throw new NotFoundException(notFoundMessage);
  }
}
