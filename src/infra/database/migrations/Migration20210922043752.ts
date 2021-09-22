import { Migration } from '@mikro-orm/migrations';

export class Migration20210922043752 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "users" ("id" uuid not null, "name" varchar(255) not null, "nickname" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "created_at" timestamp not null, "updated_at" timestamp not null);',
    );
    this.addSql(
      'alter table "users" add constraint "users_pkey" primary key ("id");',
    );
    this.addSql(
      'alter table "users" add constraint "users_nickname_unique" unique ("nickname");',
    );
    this.addSql(
      'alter table "users" add constraint "users_email_unique" unique ("email");',
    );
  }
}
