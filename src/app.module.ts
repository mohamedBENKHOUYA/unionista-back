import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '@src/config/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { jwtConfig } from './config/jwt.config';
import { ProductCategoryModule } from './entities/product-category/product-category.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './entities/user/client/client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [typeormConfig.KEY],
      useFactory: (config) => config,
    }),
    ProductCategoryModule,
    AuthModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
