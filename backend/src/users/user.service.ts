import { ForbiddenException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signUp.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserSerive {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userModal: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userModal.find();

    const result = [];
    for (const i of users) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...res } = i;
      result.push(res);
    }
    return result;
  }

  async addUser(user: SignUpDto) {
    try {
      const existUser = await this.getAUserByEmail(user.email);
      if (existUser) {
        throw new Error('User already exists!');
      }

      const hashpassword = await this.hassPassword(user.password);

      const details = await this.userModal.save({
        username: user.username,
        password: hashpassword,
        email: user.email,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = details;

      return {
        data: result,
        message: 'user created successfully',
      };
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  async getAUserByEmail(email: string) {
    return await this.userModal.findOne({ where: { email } });
  }

  async hassPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }

  async comparePasswords(newPassword: string, passwortHash: string) {
    return await bcrypt.compare(newPassword, passwortHash);
  }
}
