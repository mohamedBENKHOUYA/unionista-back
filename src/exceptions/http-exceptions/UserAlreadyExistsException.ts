import { HttpException } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor(id = '') {
    super(`User ${id} already exists`, 403);
  }
}
