import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsesRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usesRepository: UsesRepository) {}
  async create(createUserDto: CreateUserDto) {
    return this.usesRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }
  async verifyUser(email: string, password: string) {
    const user = await this.usesRepository.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { ...result } = user;
      return result;
    }
    throw new Error('Invalid credentials');
  }
}
