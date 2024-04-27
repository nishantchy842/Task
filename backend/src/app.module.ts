import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3030,
      username: 'postgres',
      password: 'nishant@123', // Add your MySQL password here
      database: 'ramailo',
      synchronize: true,
      entities: [__dirname + '/**/**.entity{.ts,.js}'],
    }),
    UserModule,
    AuthModule,
    UploadModule,
    PostModule,
    CategoryModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
