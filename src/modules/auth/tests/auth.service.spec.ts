import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../users/entities/user.model';
import { AuthService } from '../auth.service';
import { IUsersRepository } from '../../users/interfaces/user.repository.interface';
import { UsersFakeRepository } from '../../users/repositories/users.fake.repository';
import { createUserTest } from '../../../shared/utils/mocks/users';
import { jwt } from '../../../config';

let authService: AuthService;
let usersRepository: IUsersRepository;
let jwtService: JwtService;

let createdUser: User;

describe('Auth Service', () => {
  beforeEach(async () => {
    usersRepository = new UsersFakeRepository();
    jwtService = new JwtService({
      secret: jwt.secret,
      signOptions: { expiresIn: jwt.expiresIn },
    });
    authService = new AuthService(usersRepository, jwtService);

    createdUser = await createUserTest({
      usersRepository,
      email: 'user@teste.com',
      nickname: 'test',
    });
  });

  it('should be able to authenticate with email', async () => {
    const user = await authService.authUser({
      account: createdUser.email,
      password: 'test123',
    });

    expect(user).toHaveProperty('token');
  });

  it('should be able to authenticate an user with nickname', async () => {
    const user = await authService.authUser({
      account: createdUser.nickname,
      password: 'test123',
    });

    expect(user).toHaveProperty('token');
  });

  it('should not be able to authenticate an user with a not existent email', async () => {
    try {
      await authService.authUser({
        account: 'unexistent-email',
        password: 'test123',
      });
    } catch (error) {
      expect(error.message).toBe('User or password is wrong!');
      expect(error.status).toBe(HttpStatus.UNAUTHORIZED);
    }
  });

  it('should not be able to authenticate an user with a not existent nickname', async () => {
    try {
      await authService.authUser({
        account: 'unexistent-nickname',
        password: 'test123',
      });
    } catch (error) {
      expect(error.message).toBe('User or password is wrong!');
      expect(error.status).toBe(HttpStatus.UNAUTHORIZED);
    }
  });

  it('should not be able to authenticate an user with an email and wrong password', async () => {
    try {
      await authService.authUser({
        account: createdUser.email,
        password: 'wrong-password',
      });
    } catch (error) {
      expect(error.message).toBe('User or password is wrong!');
      expect(error.status).toBe(HttpStatus.UNAUTHORIZED);
    }
  });

  it('should not be able to authenticate an user with a nickname and wrong password', async () => {
    try {
      await authService.authUser({
        account: createdUser.nickname,
        password: 'wrong-password',
      });
    } catch (error) {
      expect(error.message).toBe('User or password is wrong!');
      expect(error.status).toBe(HttpStatus.UNAUTHORIZED);
    }
  });
});
