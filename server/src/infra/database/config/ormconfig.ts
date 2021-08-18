import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { postgres } from '../../../config';
import { User } from '../../../modules/users/entities/user.model';

const { type, host, port, username, password, database, logging, synchronize } =
  postgres;

export const ormConfig = {
  type,
  entities: [User],
  host,
  port,
  username,
  password,
  database,
  logging,
  synchronize,
} as TypeOrmModuleOptions;
