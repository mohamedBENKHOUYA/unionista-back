import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { typeormConfig } from './config/typeorm.config';
import { DataSource, DataSourceOptions } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.BACK_PORT || 3000);

  
  // Run migrations 
  const dbConfigs = await typeormConfig();
  const datasource = new DataSource(dbConfigs as DataSourceOptions);
  await datasource.initialize()
  .catch((err) => Logger.error(`Error during DataSource initalization: ${err} -- ${err.stack}`));
  await datasource.runMigrations({transaction: 'all'})
  .then((_) => Logger.debug('Successfully executed pending migrations.'))
  .catch((err) => Logger.error(`Error while executing pending migrations: ${err}`));
}
bootstrap();