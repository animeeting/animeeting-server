import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { isEmail } from 'class-validator';

import { User } from '../users/entities/user.model';
import { IUsersRepository } from '../users/interfaces/user.repository.interface';

import { IAuthUserDTO } from './dtos/auth-user.interface';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: IUsersRepository,
    private jwtService: JwtService,
  ) {}

  async authUser({ account, password }: IAuthUserDTO) {
    let user: User;

    if (isEmail(account)) {
      user = await this.usersRepository.findByEmail(account);
    } else {
      user = await this.usersRepository.findByNickname(account);
    }

    if (!user) {
      throw new HttpException(
        'User or password is wrong!',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new HttpException(
        'User or password is wrong!',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload: IJwtPayload = {
      user: {
        name: user.name,
        email: user.email,
        nickname: user.nickname,
      },
      sub: user.id,
    };

    const token = this.jwtService.sign(payload);

    return {
      user: {
        name: user.name,
        email: user.email,
        nickname: user.nickname,
      },
      token,
    };
  }
}
