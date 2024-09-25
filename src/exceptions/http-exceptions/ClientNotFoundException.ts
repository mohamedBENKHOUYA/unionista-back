import { NotFoundException } from '@nestjs/common';

export class ClientNotFoundException extends NotFoundException {
  constructor(id = '') {
    super(`Client ${id} not found`);
  }
}
