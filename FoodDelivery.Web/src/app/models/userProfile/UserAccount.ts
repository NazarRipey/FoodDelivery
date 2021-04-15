import { Guid } from 'guid-typescript';
import { AccountStatus } from './../enums/statuses/AccountStatus';

export class UserAccount{
    public id: Guid;
    public fullName: string;
    public email: string;
    public phoneNumber: string;
    public status: AccountStatus;
}