import { UserAccount } from './UserAccount';

export class UserListResponse{
    public users: UserAccount[];
    public totalUsersCount: number;
}