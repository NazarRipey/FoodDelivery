import { RestaurantType } from '../restaurant/RestaurantType';
import { UserShortProfile } from '../userProfile/UserShortProfile';
import { Guid } from 'guid-typescript';

export class RestaurantRequest{
    public id?: Guid;
    public name: string;
    public userProfile: UserShortProfile;
    public status: number;
    public createdDate: Date;
    public closedDate: Date
    public type: RestaurantType;
}