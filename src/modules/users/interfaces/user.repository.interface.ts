import { ICreateUserDTO } from '../dtos/create-user.dto';
import { IUpdateProfileDTO } from '../dtos/update-user.dto';
import { User } from '../entities/user.model';

export interface IUsersRepository {
  createUser(data: ICreateUserDTO): Promise<User>;
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  findByNickname(nickname: string): Promise<User>;
  findById(id: string): Promise<User>;
  updateUser(data: IUpdateProfileDTO): Promise<User>;
}
