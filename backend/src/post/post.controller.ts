import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PostService } from './post.service';
import { PostEntity } from './post.entity';
import { CreatePostDto } from './dto/create.dto';
import { UpdatePostDto } from './dto/update.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private postServices: PostService) {}

  @Get()
  @ApiOperation({
    summary: 'get all post',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Current user' })
  @ApiUnauthorizedResponse()
  async getAllPosts() {
    return this.postServices.getAllPost();
  }

  @ApiOperation({
    summary: 'get one post by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Current user' })
  @ApiUnauthorizedResponse()
  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  async findOnePost(@Param('id') id: number): Promise<PostEntity> {
    return this.postServices.findOnePost(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new post',
  })
  @ApiBody({
    type: CreatePostDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createUserDto: CreatePostDto) {
    return await this.postServices.create(createUserDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'update  post',
  })
  @ApiBody({
    type: CreatePostDto,
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateUserDto: UpdatePostDto,
  ) {
    return await this.postServices.update(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Delete user',
  })
  @ApiOkResponse({
    description: 'Deleted Successfully',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number) {
    return await this.postServices.deletePost(id);
  }
}
