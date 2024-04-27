import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from 'src/category/category.module';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([PostEntity]),
    CategoryModule,
    TagsModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
