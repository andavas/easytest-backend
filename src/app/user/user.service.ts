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

const generateHash = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, '$2b$10$OqPVs4b5aMkbR/easytest');
}

@Injectable()
export class UserService {
   
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async create(data:User) {
        const hash = await generateHash(data.password)
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
        const user = await this.findOneByIdOrFail(id)
        this.userRepository.merge(user, data)
        if(data.password) {
            const hash = await generateHash(data.password)
            this.userRepository.merge(user, {password: hash})
        }
        return this.userRepository.save(user)
    }

    async delete(id: string) {
        await this.findOneByIdOrFail(id)
        await this.userRepository.softDelete(id)
    }
}
