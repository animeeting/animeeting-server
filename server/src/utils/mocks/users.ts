import { hash } from 'bcrypt';
import { User } from 'src/modules/users/entities/user.model';
import { IUsersRepository } from 'src/modules/users/interfaces/user.repository.interface';

interface ICreateUserTestDTO {
  usersRepository: IUsersRepository;
  email: string;
  nickname: string;
}

export const createUserTest = async ({
  usersRepository,
  nickname,
  email,
}: ICreateUserTestDTO): Promise<User> => {
  const password = await hash('test123', 8);

  const user = await usersRepository.createUser({
    email,
    name: 'User Test',
    nickname,
    password,
  });

  return user;
};
