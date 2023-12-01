import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(id = '') {
    super(`user ${id} not found`);
  }
}
