import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signin.dto';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: SignInDto })
  @Post('/login')
  @UseGuards(LocalGuard)
  async login(@Req() req: Request) {
    return await this.authService.login(req.user);
  }
}
