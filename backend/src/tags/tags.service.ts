import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepo: Repository<TagEntity>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    try {
      const tags = await this.tagRepo.findOne({
        where: { title: createTagDto.title },
      });

      if (tags) {
        throw new BadRequestException('Already exists');
      }

      await this.tagRepo.save(createTagDto);

      return {
        status: HttpStatus.CREATED,
        message: 'tag created successfully',
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll() {
    try {
      const tags = await this.tagRepo.find();

      return {
        status: HttpStatus.OK,
        message: 'api called',
        result: tags,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findOne(id: number) {
    try {
      const post = await this.tagRepo.findOne({ where: { id } });

      return {
        status: HttpStatus.OK,
        data: post,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    try {
      await this.tagRepo.update(id, updateTagDto);
      return {
        status: HttpStatus.OK,
        message: 'updated successfully',
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async remove(id: number) {
    try {
      await this.tagRepo.delete(id);

      return {
        status: HttpStatus.OK,
        message: 'deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
