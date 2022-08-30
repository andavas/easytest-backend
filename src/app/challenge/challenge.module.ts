import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';
import { ChallengeEntity } from './entity/challenge.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ChallengeEntity])],
  controllers: [ChallengeController],
  providers: [ChallengeService],
  exports: [ChallengeService]
})
export class ChallengeModule {}
