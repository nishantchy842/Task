import {
  BadRequestException,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create.dto';
import { CategoryService } from 'src/category/category.service';
import { TagsService } from 'src/tags/tags.service';
import { UpdatePostDto } from './dto/update.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagsService,
  ) {}

  async getAllPost() {
    const posts = await this.postRepository.find({
      relations: ['category', 'tags'],
    });
    return posts;
  }
  @Get()
  findOnePost(id: number): Promise<PostEntity> {
    return this.postRepository.findOne({
      where: { id },
      relations: ['category', 'tags'],
    });
  }

  async create(createPostDto: CreatePostDto): Promise<any> {
    try {
      const {
        title,
        content,
        image,
        category: categoryId,
        tags,
      } = createPostDto;

      const category = await this.categoryService.findOne(categoryId);

      const tagEntities = await Promise.all(
        tags.map((tagId) => this.tagService.findOne(tagId)),
      );

      const tagIds = tagEntities.filter((tag) => !!tag).map((tag) => tag.data);

      if (!category) {
        throw new NotFoundException(`Category with ID ${categoryId} not found`);
      }

      const newPost = this.postRepository.create({
        title,
        content,
        image,
        category: { id: categoryId },
        tags: tagIds,
      });

      return await this.postRepository.save(newPost);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.findOnePost(id);

    if (!post) {
      throw new NotFoundException(' post do not exits');
    }

    const category = await this.categoryService.findOne(updatePostDto.category);

    if (!category) {
      throw new NotFoundException('category not found');
    }

    post.title = updatePostDto.title;
    post.content = updatePostDto.content;
    post.image = updatePostDto.image;
    post.category = category.data;

    const tagEntities = await Promise.all(
      updatePostDto.tags.map((tagId) => this.tagService.findOne(tagId)),
    );

    const tagIds = tagEntities.filter((tag) => !!tag).map((tag) => tag.data);

    post.tags = tagIds;

    return this.postRepository.save(post);
  }

  @Delete()
  async deletePost(id: number) {
    const { affected } = await this.postRepository.delete(id);
    if (!affected)
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    return `Post with ${id} id deleted`;
  }
}
