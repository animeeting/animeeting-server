import * as path from 'path';
import { User } from '../../../modules/users/entities/user.model';
import { ormConfig } from './ormconfig';

export default {
  ...ormConfig,
  entities: [User],
  migrations: [path.resolve(__dirname, '..', 'migrations', '*.ts')],
  cli: {
    migrationsDir: [path.resolve(__dirname, '..', 'migrations')],
  },
};
