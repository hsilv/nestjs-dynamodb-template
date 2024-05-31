import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './user.schema';
import { DynamooseModule } from 'nestjs-dynamoose';

@Module({
  imports: [
    DynamooseModule.forFeature([{
      name: 'User',
      schema: UserSchema,
      options: {
        tableName: process.env.STAGE ? `users-${process.env.STAGE}` : 'users',
        create: true,
        throughput: 'ON_DEMAND'
      }
    }])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
