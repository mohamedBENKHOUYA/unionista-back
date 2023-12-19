import { Injectable } from '@nestjs/common';
import { PageDto } from './dtos/page-options';

@Injectable()
export class PaginatorService {
  public async findPage<T>(): Promise<PageDto<T>> {
    return {
      data: [],
      metadata: {
        count: 10,
        page: 2,
        limit: 5,
      },
    };
  }
}
