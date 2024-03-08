import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createConnection } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.BACK_PORT || 3000);

  const connection = await createConnection({
    type: 'postgres',
    host: process.env.TYPEORM_HOST || 'localhost',
    port: parseInt(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: ['src/**/*.model.ts'],
    migrations: ['dist/scripts/migrations/*'],
    logging: true,
  });
  await connection.runMigrations({
    transaction: 'all'
  });
  await connection.close();
}
bootstrap();
