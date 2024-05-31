// src/user/user.service.ts
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { User, UserKey } from './user.schema';
import { v5 as uuidv5 } from 'uuid';
import { createHash } from 'crypto';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private userModel: Model<User, UserKey>
    ) { }

    async create(user: User) {
        try {
            const created = await this.userModel.create(user)
            return created

        } catch (error) {
            if (error.name === 'ConditionalCheckFailedException') {
                throw new ConflictException('User already exists');
            } else if (error.name === 'TypeMismatch' || error.name === 'ValidationError') {
                throw new BadRequestException('Invalid input', error.name === 'ValidationError' ? error.message + ', bad email format' : error.message);
            }
            else {
                console.error(error);
                throw new InternalServerErrorException('Error creating user');
            }
        }
    }

    update(key: UserKey, user: Partial<User>) {
        return this.userModel.update(key, user)
    }

    findOne(key: UserKey) {
        return this.userModel.get(key)
    }

    async findAll() {
        return await this.userModel.scan().exec();
    }

    generateUserId(email: string) {
        const hash = createHash('sha256');
        hash.update(email);
        const id = hash.digest('hex');
        return id;
    }
}