import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { Exclude } from 'class-transformer';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey({ columnType: 'uuid' })
  id: string = uuid();

  @Property()
  name!: string;

  @Property()
  @Unique()
  nickname!: string;

  @Property()
  @Unique()
  email!: string;

  @Exclude()
  @Property()
  password!: string;

  @Property({ columnType: 'timestamp' })
  created_at = new Date();

  @Property({ columnType: 'timestamp', onUpdate: () => new Date() })
  updated_at = new Date();
}
