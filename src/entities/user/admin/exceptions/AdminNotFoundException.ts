import { NotFoundException } from '@nestjs/common';

export class AdminNotFoundException extends NotFoundException {
  constructor() {
    super('admin not found');
  }
}
