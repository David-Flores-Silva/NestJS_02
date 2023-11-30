import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepositive: Repository<User>,
  ) { }

  create(createUserDto: CreateUserDto) {
    const user = this.usersRepositive.create(createUserDto);
    return this.usersRepositive.save(user);
  }

  findAll() {
    return this.usersRepositive.find();
  }

  findOne(id: number) {
    return this.usersRepositive.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.usersRepositive.findOneBy({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepositive.update(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
