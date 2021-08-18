import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ICreateUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.model';
import { IUsersRepository } from './interface/user.repository.interface';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: IUsersRepository,
  ) {}

  async createUser({
    name,
    nickname,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new HttpException('E-mail already exists!', HttpStatus.BAD_REQUEST);
    }

    const nicknameExists = await this.usersRepository.findByNickname(nickname);

    if (nicknameExists) {
      throw new HttpException(
        'Nickname already exists!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.createUser({
      name,
      nickname,
      email,
      password: passwordHash,
    });

    delete user.password;

    return user;
  }

  async listAllUsers() {
    return this.usersRepository.findAll();
  }
}
