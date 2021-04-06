import { Guid } from 'guid-typescript';

export class UserProfile{
    id: Guid;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    birthday: Date;
    address?: string;
    roles?: string[];
}