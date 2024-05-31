import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.schema';
import { CreateUserDto, ResponseUserDto } from './user.dto';
import { StatusCodes } from 'http-status-codes';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiOperation({ summary: 'Create User' })
    @ApiBody({ type: CreateUserDto }) // Esto hará que Swagger pida un cuerpo de tipo User
    @ApiResponse({ status: StatusCodes.CREATED, description: 'User created.', type: ResponseUserDto })
    @ApiResponse({ status: StatusCodes.BAD_REQUEST, description: 'Invalid input.' })
    @ApiResponse({ status: StatusCodes.CONFLICT, description: 'User already exists.' })
    @ApiResponse({ status: StatusCodes.INTERNAL_SERVER_ERROR, description: 'Server error.' })
    @Post()
    async createUser(@Body() body: CreateUserDto): Promise<any> {
        const user = await this.userService.create({ id: this.userService.generateUserId(body.email), ...body });
        return user;
    }

    @ApiOperation({ summary: 'Get User' })
    @ApiResponse({ status: 200, description: 'User found.', type: ResponseUserDto })
    @Get(':id')
    async getUser(@Param('id') id: string): Promise<any> {
        const user = await this.userService.findOne({ id });
    }

    @ApiOperation({ summary: 'Get All Users' })
    @ApiResponse({ status: 200, description: 'Users found.', type: [ResponseUserDto] })
    @Get()
    async getAllUsers(): Promise<any> {
        const users = await this.userService.findAll();
        return users;
    }
}