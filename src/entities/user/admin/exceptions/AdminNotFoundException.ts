import { HttpException } from '@nestjs/common';

export class AdminNotFoundException extends HttpException {
  constructor() {
    super('admin not found', 404);
  }
}
