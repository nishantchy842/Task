import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserSerive } from 'src/users/user.service';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userServices: UserSerive,
    private jwtServices: JwtService,
  ) {}

  async ValidateUser(email: string, password: string) {
    const user = await this.userServices.getAUserByEmail(email);

    const hasspossword = await bcrypt.compare(password, user.password);

    if (user && hasspossword) {
      return user;
    }
    return null;
  }

  public async findUserByEmail(signInData: SignInDto) {
    return await this.userServices.getAUserByEmail(signInData.email);
  }

  async login(user) {
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rem } = user;
    return {
      data: rem,
      token: this.jwtServices.sign(payload),
    };
  }
}
