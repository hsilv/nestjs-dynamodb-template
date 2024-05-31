import { Schema } from 'dynamoose';

export const UserSchema = new Schema({
    id: {
        type: String,
        hashKey: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: (email: string) => /\S+@\S+\.\S+/.test(email)
    },
})

export interface UserKey {
    id: string;
}

export interface User extends UserKey {
    name: string;
    email: string;
}