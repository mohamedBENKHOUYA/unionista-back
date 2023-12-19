import { Transform } from 'class-transformer';

export class VariationOutoingDto {
  @Transform(({ obj }) => {
    if (obj.translations) {
      return obj.translations[0];
    }
  })
  translations: [];
}
