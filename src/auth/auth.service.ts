import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../app/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { EntityNotFoundError } from 'typeorm';
import { UserEntity } from 'src/app/user/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { response } from 'express';

interface User {
  email: string;
  password: string;
  [k: string]: any;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findOneByEmailOrFail(email);
      const hash = await bcrypt.hash(pass, '$2b$10$OqPVs4b5aMkbR/easytest');
      if (user && user.password === hash) {
        const { password, ...result } = user;
        return result;
      } else {
        return { errorMsg: 'Email ou senha inválidos' };
      }
    } catch (e: any) {
      if (e instanceof EntityNotFoundError) {
        return { errorMsg: 'Email ou senha inválidos' };
      } else {
        return null;
      }
    }
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.userId };
    let result = this.validateUser(user.email, user.password);

    // throw new BadRequestException("Usuário nao existe.");
    return result.then((response) => {
      if (response) {
        if (response.id) {
          return {
            access_token: this.jwtService.sign(payload),
          };
        } else {
          return { msg: response.errorMsg };
        }
      } else {
        return null
      }
    });
  }
}
