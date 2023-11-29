import {
  UnauthorizedException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) { }

  async register({ name, email, password }: RegisterDto) {
    const user = await this.userService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('Ya existe');
    }
    return await this.userService.create({
      name,
      email,
      password: await bcryptjs.hash(password, 10),
    });
  }

  async login({ email, password }: LoginDto) {
    //validamos el email
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('No existe el usaurio or email incorrect');
    }

    //validamos el password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('password is wrong');
    }
    return user;
  }

  all() {
    return this.userService.findAll();
  }
}
