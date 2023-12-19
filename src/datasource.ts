import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { number, object, string } from 'yup';

config();

const typeormConfigSchema = object({
  TYPEORM_HOST: string().required(),
  TYPEORM_USERNAME: string().required(),
  TYPEORM_PASSWORD: string().required(),
  TYPEORM_DATABASE: string().required(),
  TYPEORM_PORT: number().required(),
  TYPEORM_RETRY_ATTEMPTS: number().positive(),
});

typeormConfigSchema.validate(process.env);

export default new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: parseInt(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: ['src/**/*.model.ts'],
  migrations: ['scripts/migrations/*'],
});
