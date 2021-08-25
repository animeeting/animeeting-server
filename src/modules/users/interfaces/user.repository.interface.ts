import { ICreateUserDTO } from '../dtos/create-user.dto';
import { User } from '../entities/user.model';

export interface IUsersRepository {
  createUser(data: ICreateUserDTO): Promise<User>;
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  findByNickname(nickname: string): Promise<User>;
}