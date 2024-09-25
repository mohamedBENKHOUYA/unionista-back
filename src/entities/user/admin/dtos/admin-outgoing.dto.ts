import { Exclude, Transform } from 'class-transformer';

export class AdminOutgoingDto {
  @Transform(({ obj }) => {
    if (obj.translations) {
      return obj.translations[0];
    }
  })
  translations: [];

  @Exclude()
  password: string;
}
