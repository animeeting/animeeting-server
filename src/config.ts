import { config } from 'dotenv';

config({ path: '.env' });

const REQUIRED_ENV_VARS = [
  'DATABASE_TYPE',
  'POSTGRES_HOST',
  'POSTGRES_HOST_CLI',
  'POSTGRES_PORT',
  'POSTGRES_USERNAME',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
  'ORM_LOG_ENABLED',
];

REQUIRED_ENV_VARS.forEach((envVar) => {
  const val = process.env[envVar];
  if (!val) {
    throw new Error(`Required ENV VAR not set: ${envVar}`);
  }
});

export const port = process.env.PORT || 3000;

export const postgres = {
  type: process.env.DATABASE_TYPE,
  host: process.env.POSTGRES_HOST,
  hostCli: process.env.POSTGRES_HOST_CLI,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  dbName: process.env.POSTGRES_DATABASE,
  debug: process.env.ORM_LOG_ENABLED === 'true' || false,
};
