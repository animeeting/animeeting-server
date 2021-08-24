import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateUserDTO } from '../dto/create-user.dto';
import { User } from '../entities/user.model';
import { IUsersRepository } from '../interfaces/user.repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
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

    const createdUser = this.usersRepository.create(user);

    await this.usersRepository.save(createdUser);

    return createdUser;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findByNickname(nickname: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { nickname } });
  }
}
