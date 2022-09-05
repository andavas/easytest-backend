import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameEntity } from './entity/game.entity';

@Module({
  imports:[TypeOrmModule.forFeature([GameEntity])],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService]
})
export class GameModule {}
