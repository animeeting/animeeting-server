import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnilistModule } from './modules/anilist/anilist.module';
import { UsersModule } from './modules/users/users.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      //@ts-ignore
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_APPHOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [],
      synchronize: false,
    }),
    AnilistModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
