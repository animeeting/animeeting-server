import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { postgres } from 'src/config';

const { type, host, hostCli, port, user, password, dbName, debug } = postgres;

export const ormConfig = {
  type,
  dbName,
  user,
  password,
  debug,
  host,
  port,
  entities: ['./dist/modules/**/entities/*.js'],
  entitiesTs: ['./src/modules/**/entities/*.ts'],
  migrations: {
    tableName: 'migrations',
    path: './src/infra/database/migrations',
    pattern: /^[\w-]+\d+\.ts$/,
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    dropTables: true,
    safe: false,
    emit: 'ts',
  },
} as MikroOrmModuleOptions;

export const ormConfigCli = {
  ...ormConfig,
  host: hostCli,
};
