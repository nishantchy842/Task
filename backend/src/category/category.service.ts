import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepo.findOne({
      where: { name: createCategoryDto.name },
    });

    if (category) {
      throw new HttpException('Already exits', HttpStatus.FORBIDDEN);
    }

    await this.categoryRepo.save(createCategoryDto);

    return {
      status: HttpStatus.OK,
      message: 'created successfully',
    };
  }

  async findAll() {
    const category = await this.categoryRepo.find({ relations: ['posts'] });
    return category;
  }

  async findOne(id: number) {
    try {
      const category = await this.categoryRepo.findOne({
        where: { id },
        relations: ['posts'],
      });

      return {
        status: HttpStatus.OK,
        data: category,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const post = await this.categoryRepo.update(id, updateCategoryDto);

      return post;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async remove(id: number) {
    try {
      return await this.categoryRepo.delete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
