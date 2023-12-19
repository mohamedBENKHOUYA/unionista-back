import { Transform } from 'class-transformer';

export class PromotionOutoingDto {
  @Transform(({ obj }) => {
    if (obj.translations) {
      return obj.translations[0];
    }
  })
  translations: [];
}
