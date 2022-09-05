import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './app/user/user.module';
import { ChallengeModule } from './app/challenge/challenge.module';
import { GameModule } from './app/game/game.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        type: 'postgres',
        host: cs.get('DB_HOST','localhost'),
        port: Number(cs.get('DB_PORT',5432)),
        username:cs.get('DB_USERNAME','postgres'),
        password: cs.get('DB_PASSWORD','root'),
        database: cs.get('DB_DATABASE','easytest'),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: true,
      }),
    }),
    UserModule,
    ChallengeModule,
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
