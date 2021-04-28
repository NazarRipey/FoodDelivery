import { Guid } from 'guid-typescript';

export class UserProfile{
    public id: Guid;
    public firstName: string;
    public lastName: string;
    public email: string;
    public phoneNumber: string;
    public birthday: Date;
    public base64Image: string;
    public address?: string;
    public roles?: string[];
}