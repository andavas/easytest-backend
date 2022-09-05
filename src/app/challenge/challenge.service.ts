import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChallengeEntity } from './entity/challenge.entity';

@Injectable()
export class ChallengeService {
   
    constructor(
        @InjectRepository(ChallengeEntity)
        private readonly challengeRepository: Repository<ChallengeEntity>
    ) {}

    async create(data) {
        return await this.challengeRepository.save(this.challengeRepository.create(data))
    }

    async findAll() {
        return await this.challengeRepository.find()
    }
    async findOneByIdOrFail(id: string) {
        try {
            return await this.challengeRepository.findOneOrFail({
                where: { id: id }
            })   
        }
        catch (error) {
            throw new NotFoundException(error.message)
        }
    }

    async update(id:string, data) {
        const challenge = await this.findOneByIdOrFail(id)
        this.challengeRepository.merge(challenge, data)
        return this.challengeRepository.save(challenge)
    }

    async delete(id: string) {
        await this.findOneByIdOrFail(id)
        await this.challengeRepository.softDelete(id)
    }
}
