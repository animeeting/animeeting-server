import { Injectable } from '@nestjs/common';

import { ICreateUserDTO } from '../dtos/create-user.dto';
import { IUpdateProfileDTO } from '../dtos/update-user.dto';
import { User } from '../entities/user.model';
import { IUsersRepository } from '../interfaces/user.repository.interface';

@Injectable()
export class UsersFakeRepository implements IUsersRepository {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
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
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findByNickname(nickname: string): Promise<User> {
    return this.users.find((user) => user.nickname === nickname);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async updateUser({
    id,
    name,
    nickname,
    email,
    password,
  }: IUpdateProfileDTO): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    Object.assign(user, {
      name,
      nickname,
      email,
      password: password ? password : user.password,
      updated_at: new Date(),
    });

    const findIndex = this.users.findIndex((findUser) => findUser.id === id);

    this.users[findIndex] = user;

    return this.users[findIndex];
  }
}
