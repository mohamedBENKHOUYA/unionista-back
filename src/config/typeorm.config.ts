import { registerAs } from '@nestjs/config';
import { VariationOptionTranslation } from '@src/entities/variation-option/variation-option-trans.model';
import { VariationOptionModel } from '@src/entities/variation-option/variation-option.model';
import { join } from 'path';
import { number, object, string } from 'yup';

const typeormConfigSchema = object({
  TYPEORM_HOST: string().required(),
  TYPEORM_USERNAME: string().required(),
  TYPEORM_PASSWORD: string().required(),
  TYPEORM_DATABASE: string().required(),
  TYPEORM_PORT: number().required(),
  TYPEORM_RETRY_ATTEMPTS: number().positive().optional(),
});

export const typeormConfig = registerAs('back_db', async function () {
  const env = await typeormConfigSchema.validate(process.env);

  return {
    type: 'postgres',
    host: env.TYPEORM_HOST,
    port: env.TYPEORM_PORT,
    username: env.TYPEORM_USERNAME,
    password: env.TYPEORM_PASSWORD,
    database: env.TYPEORM_DATABASE,
    retryAttempts: env.TYPEORM_RETRY_ATTEMPTS,
    entities: [join('__dirname', '..', '**', '*.model.js')],
  };
});
