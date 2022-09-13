import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

interface User {
    name: string
    email: string
    password: string
}

function removepass(user) {
   return(
    {...user, password: undefined}
   ) 
}

@Injectable()
export class UserService {
   
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async create(data:User) {
        const hash = await bcrypt.hash(data.password,'$2b$10$OqPVs4b5aMkbR/easytest')
        return await this.userRepository.save(this.userRepository.create({...data, password: hash}))
    }

    async findAll() {
        return await this.userRepository.find()
    }
    async findOneByEmailOrFail(email: string) {
        try {
            return this.userRepository.findOneOrFail({
                where: { email: email }
            })
        }
        catch (error) {
            throw new NotFoundException(error.message)
        }
    }

    async findOneByIdOrFail(id: string) {
        try {
            return this.userRepository.findOneOrFail({
                where: { id: id }
            })
        }
        catch (error) {
            throw new NotFoundException(error.message)
        }
    }

    async update(id:string, data) {
        const user = await this.findOneByEmailOrFail(id)
        this.userRepository.merge(user, data)
        return this.userRepository.save(user)
    }

    async delete(id: string) {
        await this.findOneByEmailOrFail(id)
        await this.userRepository.softDelete(id)
    }
}
