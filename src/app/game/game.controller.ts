import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('api/games')
export class GameController {

    constructor(private readonly gameService: GameService) {}

    @Get()
    async index() {
        return await this.gameService.findAll();
    }
    @Post()
    async create(@Body() body) {
        return this.gameService.create(body)
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.gameService.findOneByIdOrFail(id)
    }

    @Patch(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body) {
        return this.gameService.update(id, body)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id:string) {
        await this.gameService.delete(id)
    }
}
