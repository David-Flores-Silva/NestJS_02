import {
  UnauthorizedException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async register({ name, email, password }: RegisterDto) {
    const user = await this.userService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('Ya existe');
    }
    await this.userService.create({
      name,
      email,
      password: await bcryptjs.hash(password, 10),
    });
    return {
      name,
      email,
    };
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

    const payload = { email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email,
    };
  }
  async profile({ email, role }: { email: string; role: string }) {
    if (role !== 'admin') {
      throw new UnauthorizedException('No esta autorizado');
    }
    return await this.userService.findOneByEmail(email);
  }

  all() {
    return this.userService.findAll();
  }
}
