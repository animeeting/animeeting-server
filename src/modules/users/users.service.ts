import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { ICreateUserDTO } from './dtos/create-user.dto';
import { IUpdateProfileDTO } from './dtos/update-user.dto';
import { User } from './entities/user.model';
import { IUsersRepository } from './interfaces/user.repository.interface';

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

  async listAllUsers(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async updateUserProfile({
    id,
    name,
    nickname,
    email,
    password,
    old_password,
  }: IUpdateProfileDTO): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists && emailExists.id !== id) {
      throw new HttpException(
        'Email has already been used!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const nicknameExists = await this.usersRepository.findByNickname(nickname);

    if (nicknameExists && nicknameExists.id !== id) {
      throw new HttpException(
        'Nickname has already been used!',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.name = name;
    user.email = email;
    user.nickname = nickname;

    if (password && !old_password) {
      throw new HttpException(
        'You need to inform the old password to set a new password!',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (password && old_password) {
      const oldPasswordMatch = await compare(old_password, user.password);

      if (!oldPasswordMatch) {
        throw new HttpException(
          'Old password does not match!',
          HttpStatus.BAD_REQUEST,
        );
      }

      user.password = await hash(password, 8);
    }

    const updatedUser = await this.usersRepository.updateUser(user);

    return updatedUser;
  }

  async showUserProfile(id: string): Promise<User> {
    return this.usersRepository.findById(id);
  }
}
