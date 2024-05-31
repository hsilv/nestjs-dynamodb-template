import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiOperation({ summary: 'Create User' })
    @ApiResponse({ status: 200, description: 'User created.' })
    @Post()
    async createUser(@Body() body: any): Promise<any> {
        const user = await this.userService.createUser(body);
        return { status: true, data: user };
    }

    @ApiOperation({ summary: 'Get User by ID' })
    @ApiResponse({ status: 200, description: 'User found.' })
    @Get(':id')
    async getUserById(@Param() { id }: any): Promise<any> {
        const user = await this.userService.getUserById(id);
        if (!user) {
            throw new NotFoundException(`User with ID "${id}" not found`);
        }
        return { status: true, data: user };
    }
}