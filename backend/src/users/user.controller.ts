import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserSerive } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dto/signUp.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly todoService: UserSerive) {}

  @Post()
  @ApiOperation({
    summary: 'Add users',
  })
  async newUser(@Body() data: SignUpDto) {
    return await this.todoService.addUser(data);
  }

  @Get()
  async findAll() {
    return this.todoService.findAll();
  }
}
