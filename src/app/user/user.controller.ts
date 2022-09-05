import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/v1/users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    async index() {
        return await this.userService.findAll();
    }
    @Post()
    async create(@Body() body) {
        return this.userService.create(body)
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.userService.findOneByIdOrFail(id)
    }

    @Patch(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body) {
        return this.userService.update(id, body)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id:string) {
        await this.userService.delete(id)
    }
}
