import { ApiProperty } from '@nestjs/swagger';
import { object, string } from 'yup';

export class CreateProductCategoryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  parentId?: string;

  @ApiProperty()
  imageFile?: Express.Multer.File;
}

export const createProductCategorySchema = object({
  name: string().required(),
  slug: string().required(),
  description: string(),
  parentId: string(),
});
