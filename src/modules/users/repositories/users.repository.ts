import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ICreateUserDTO } from '../dtos/create-user.dto';
import { User } from '../entities/user.model';
import { IUsersRepository } from '../interfaces/user.repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: EntityRepository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  async createUser({
    email,
    nickname,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name,
      nickname,
      email,
      password,
    });

    await this.usersRepository.persistAndFlush(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ email });
  }

  async findByNickname(nickname: string): Promise<User> {
    return await this.usersRepository.findOne({ nickname });
  }
}
