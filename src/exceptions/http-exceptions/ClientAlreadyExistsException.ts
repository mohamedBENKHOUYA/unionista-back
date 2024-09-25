import { HttpException } from '@nestjs/common';

export class ClientAlreadyExistsException extends HttpException {
  constructor(id = '') {
    super(`Client ${id} already exists`, 403);
  }
}
