import { HttpException, HttpStatus } from '@nestjs/common';
import { createUserTest } from 'src/shared/utils/mocks/users';

import { createUserTest } from '../../../shared/utils/mocks/users';
import { IUpdateProfileDTO } from '../dtos/update-user.dto';
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

  it('should be able to show user profile', async () => {
    const user = await createUserTest({
      usersRepository,
      email: 'user@test.com',
      nickname: 'test',
    });
  
    const profile = await usersService.showUserProfile(user.id);

    expect(profile).toBe(user);
  }

  it('should be able to update user', async () => {
    const user = await createUserTest({
      usersRepository,
      email: 'user@test.com',
      nickname: 'test',
    });
  
    const updateUser: IUpdateProfileDTO = {
      id: user.id,
      name: 'New User Name',
      nickname: 'newnickname',
      email: 'newEmailTest',
      old_password: 'test123',
      password: 'newPassword',
    };

    const updatedUser = await usersService.updateUserProfile(updateUser);

    expect(updatedUser.id).toBe(user.id);
    expect(user.nickname).toBe(updatedUser.nickname);
  });

  it('should be able to update user without password', async () => {
    const user = await createUserTest({
      usersRepository,
      email: 'user@test.com',
      nickname: 'test',
    });

    const updateUser: IUpdateProfileDTO = {
      id: user.id,
      name: 'New User Name',
      nickname: 'newnickname',
      email: 'newEmailTest',
    };

    const updatedUser = await usersService.updateUserProfile(updateUser);

    expect(updatedUser.id).toBe(user.id);
    expect(user.nickname).toBe(updatedUser.nickname);
  });

  it('should not be able to update an unexistent user', async () => {
    const user = await createUserTest({
      usersRepository,
      email: 'user@test.com',
      nickname: 'test',
    });

    const updateUser: IUpdateProfileDTO = {
      id: 'unexistent-id',
      name: user.name,
      nickname: user.nickname,
      email: user.email,
    };

    try {
      await usersService.updateUserProfile(updateUser);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('User not found!');
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
    }
  });

  it('should not be able to update with an existent email', async () => {
    const user1 = await createUserTest({
      usersRepository,
      email: 'user1@test.com',
      nickname: 'test1',
    });

    const user2 = await createUserTest({
      usersRepository,
      email: 'user2@test.com',
      nickname: 'test2',
    });

    const updateUser: IUpdateProfileDTO = {
      id: user1.id,
      name: user1.name,
      nickname: user1.nickname,
      email: user2.email,
    };

    try {
      await usersService.updateUserProfile(updateUser);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Email has already been used!');
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  it('should not be able to update with an existent nickname', async () => {
    const user1 = await createUserTest({
      usersRepository,
      email: 'user1@test.com',
      nickname: 'test1',
    });

    const user2 = await createUserTest({
      usersRepository,
      email: 'user2@test.com',
      nickname: 'test2',
    });

    const updateUser: IUpdateProfileDTO = {
      id: user1.id,
      name: user1.name,
      nickname: user2.nickname,
      email: user1.email,
    };

    try {
      await usersService.updateUserProfile(updateUser);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Nickname has already been used!');
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  it('should not be able to update password without old password', async () => {
    const user = await createUserTest({
      usersRepository,
      email: 'user1@test.com',
      nickname: 'test1',
    });

    const updateUser: IUpdateProfileDTO = {
      id: user.id,
      name: user.name,
      nickname: user.nickname,
      email: user.email,
      password: 'newPassword',
    };

    try {
      await usersService.updateUserProfile(updateUser);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe(
        'You need to inform the old password to set a new password!',
      );
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  it('should not be able to update password with an wrong old password', async () => {
    const user = await createUserTest({
      usersRepository,
      email: 'user1@test.com',
      nickname: 'test1',
    });

    const updateUser: IUpdateProfileDTO = {
      id: user.id,
      name: user.name,
      nickname: user.nickname,
      email: user.email,
      old_password: 'wrongPassword',
      password: 'newPassword',
    };

    try {
      await usersService.updateUserProfile(updateUser);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Old password does not match!');
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
    }
  });
});
