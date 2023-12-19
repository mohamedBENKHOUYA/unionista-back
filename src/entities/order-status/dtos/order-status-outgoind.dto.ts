import { Transform } from 'class-transformer';

export class OrderStatusOutoingDto {
  @Transform(({ obj }) => {
    if (obj.translations) {
      return obj.translations[0];
    }
  })
  translations: [];
}
