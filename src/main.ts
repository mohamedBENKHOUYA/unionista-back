import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import DataSource from './datasource';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.BACK_PORT || 3000);

  // Run migrations 
  await DataSource.initialize()
  .catch((err) => Logger.error(`Error during DataSource initalization: ${err}`));
  await DataSource.runMigrations({transaction: 'all'})
  .then((res) => Logger.debug(`Successfully executed pending migrations${res? ' :' + res: '.'}`))
  .catch((err) => Logger.error(`Error while executing pending migrations: ${err}`));
}
bootstrap();
