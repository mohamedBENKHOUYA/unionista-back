import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { typeormConfig } from '@src/config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryModule } from './entities/product-category/product-category.module';
import { UserModule } from './entities/user/user.module';
import { jwtConfig } from './config/jwt.config';
import { AuthModule } from './auth/auth.module';

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
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
