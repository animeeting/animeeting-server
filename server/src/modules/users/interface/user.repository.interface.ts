import { ICreateUserDTO } from '../dto/create-user.dto';
import { User } from '../entities/user.model';

export interface IUsersRepository {
  createUser(data: ICreateUserDTO): Promise<User>;
  findAll(): Promise<User[]>;
}
