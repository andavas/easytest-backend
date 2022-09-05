import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
   
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async create(data) {
        return await this.userRepository.save(this.userRepository.create(data))
    }

    async findAll() {
        return await this.userRepository.find()
    }
    async findOneByIdOrFail(id: string) {
        try {
            return await this.userRepository.findOneOrFail({
                where: { id: id }
            })   
        }
        catch (error) {
            throw new NotFoundException(error.message)
        }
    }

    async update(id:string, data) {
        const user = await this.findOneByIdOrFail(id)
        this.userRepository.merge(user, data)
        return this.userRepository.save(user)
    }

    async delete(id: string) {
        await this.findOneByIdOrFail(id)
        await this.userRepository.softDelete(id)
    }
}
