import { Transform } from 'class-transformer';

export class ShippingMethodOutoingDto {
  @Transform(({ obj }) => {
    if (obj.translations) {
      return obj.translations[0];
    }
  })
  translations: [];
}
