import { HttpException, HttpStatus, PipeTransform } from '@nestjs/common';
import { AnySchema } from 'yup';
import { ValidationError } from 'yup';

export class YupPipe implements PipeTransform {
  constructor(
    private readonly schema: AnySchema,
    private readonly code = 400,
  ) {}

  async transform(value: unknown): Promise<unknown> {
    try {
      return await this.schema.validate(value);
    } catch (err) {
      if (ValidationError.isError(err)) {
        throw new HttpException(
          {
            message: err.message,
            error: err,
          },
          this.code,
        );
      } else {
        throw err;
      }
    }
  }
}
