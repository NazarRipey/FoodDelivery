import { Guid } from 'guid-typescript';

export class UpdateProfile{
    public id: Guid;
    public firstName: string;
    public lastName: string;
    public birthday: Date;
    public address: string;
}