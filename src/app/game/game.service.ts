import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterOperator, paginate } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { GameEntity } from './entity/game.entity';

@Injectable()
export class GameService {
   
    constructor(
        @InjectRepository(GameEntity)
        private readonly gameRepository: Repository<GameEntity>

    ) {}

    async create(data) {
        return await this.gameRepository.save(this.gameRepository.create(data))
    }

    // async findAll(query) {
    //     return paginate(query, this.gameRepository, {
    //         sortableColumns: ['id', 'createdAt', 'userID', 'challengeID'],
    //         nullSort: 'last',
    //         defaultSortBy: [['id', 'DESC']],
    //         filterableColumns: {
    //           score: [FilterOperator.GTE, FilterOperator.LTE],
    //           reloads: [FilterOperator.GTE, FilterOperator.LTE],
    //         },
    //       })
    // }

    async findAll() {
        return await this.gameRepository.find()
    }

    async findOneByIdOrFail(id: string) {
        try {
            return await this.gameRepository.findOneOrFail({
                where: { id: id }
            })   
        }
        catch (error) {
            throw new NotFoundException(error.message)
        }
    }

    async update(id:string, data) {
        const game = await this.findOneByIdOrFail(id)
        this.gameRepository.merge(game, data)
        return this.gameRepository.save(game)
    }

    async delete(id: string) {
        await this.findOneByIdOrFail(id)
        await this.gameRepository.softDelete(id)
    }

}
