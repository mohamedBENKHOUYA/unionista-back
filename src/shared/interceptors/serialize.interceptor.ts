// export class

import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';

export function Serialize(Dto: any) {
  return UseInterceptors(new SerializeInterceptor(Dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private Dto: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.Dto, data, {});
      }),
    );
  }
}
