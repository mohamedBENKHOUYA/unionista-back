import { ApiProperty } from '@nestjs/swagger';
import { object, string } from 'yup';

export class CreateProductCategoryDto {
  @ApiProperty()
  imagePath?: string;

  @ApiProperty()
  parentCategoryId?: string | null;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}

export const createProductCategorySchema = object({
  name: string().required(),
  description: string(),
  imagePath: string(),
  parentCategoryId: string(),
});
