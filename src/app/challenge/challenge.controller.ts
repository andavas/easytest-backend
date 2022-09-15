import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChallengeService } from './challenge.service';

@UseGuards(JwtAuthGuard)
@Controller('api/challenges')
export class ChallengeController {

    constructor(private readonly challengeService: ChallengeService) {}

    @Get()
    async index() {
        return await this.challengeService.findAll();
    }
    @Post()
    async create(@Body() body) {
        return this.challengeService.create(body)
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.challengeService.findOneByIdOrFail(id)
    }

    @Patch(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body) {
        return this.challengeService.update(id, body)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id:string) {
        await this.challengeService.delete(id)
    }
}
