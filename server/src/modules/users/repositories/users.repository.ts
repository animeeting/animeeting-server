import { Injectable } from '@nestjs/common';
import { ICreateUserDTO } from '../dto/create-user.dto';
import { User } from '../entities/user.model';
import { IUsersRepository } from '../interface/user.repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
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
}