import { HttpException, HttpStatus } from '@nestjs/common';
import { createUserTest } from 'src/shared/utils/mocks/users';

import { IUsersRepository } from '../interfaces/user.repository.interface';
import { UsersFakeRepository } from '../repositories/users.fake.repository';
import { UsersService } from '../users.service';

let usersService: UsersService;
let usersRepository: IUsersRepository;

describe('Users Service', () => {
  beforeEach(() => {
    usersRepository = new UsersFakeRepository();
    usersService = new UsersService(usersRepository);
  });

  it('should be able to create a new user', async () => {
    const user = await usersService.createUser({
      email: 'user@test.com',
      name: 'User Test',
      nickname: 'test',
      password: 'test123',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('User Test');
  });

  it('should not be able to create a new user with an existent email', async () => {
    await createUserTest({
      usersRepository,
      email: 'user@test.com',
      nickname: 'test',
    });

    try {
      await usersService.createUser({
        name: 'User Test',
        email: 'user@test.com',
        nickname: 'test2',
        password: 'test123',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('E-mail already exists!');
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  it('should not be able to create a new user with an existent nickname', async () => {
    await createUserTest({
      usersRepository,
      email: 'user@test.com',
      nickname: 'test',
    });

    try {
      await usersService.createUser({
        name: 'User Test',
        email: 'user2@test.com',
        nickname: 'test',
        password: 'test123',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Nickname already exists!');
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  it('should be able to list all users', async () => {
    const user = await createUserTest({
      usersRepository,
      email: 'user@test.com',
      nickname: 'test',
    });

    const user2 = await createUserTest({
      usersRepository,
      email: 'user2@test.com',
      nickname: 'test2',
    });

    const [listedUser, listedUser2] = await usersService.listAllUsers();

    expect(listedUser).toBe(user);
    expect(listedUser2).toBe(user2);
  });
});
