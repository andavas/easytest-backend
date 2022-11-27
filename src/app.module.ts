import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './app/user/user.module';
import { ChallengeModule } from './app/challenge/challenge.module';
import { GameModule } from './app/game/game.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        type: 'postgres',
        host: cs.get('DB_HOST',process.env.DB_HOST),
        port: Number(cs.get('DB_PORT',process.env.DB_PORT)),
        username:cs.get('DB_USERNAME',process.env.DB_USERNAME),
        password: cs.get('DB_PASSWORD',process.env.DB_PASSWORD),
        database: cs.get('DB_DATABASE',process.env.DB_DATABASE),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: true,
      }),
    }),
    UserModule,
    ChallengeModule,
    GameModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
