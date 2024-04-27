import { Module } from '@nestjs/common';
import { UserSerive } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserSerive],
  exports: [UserSerive],
})
export class UserModule {}
