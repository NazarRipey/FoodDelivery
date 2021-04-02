import { restaurantType } from './../restaurant/restaurantType';
import { userShortProfile } from '../userProfile/userShortProfile';
import { Guid } from 'guid-typescript';

export class restaurantRequestObject{
    public id?: Guid;
    public name: string;
    public userProfile: userShortProfile;
    public status: number;
    public createdDate: Date;
    public closedDate: Date
    public type: restaurantType;
}