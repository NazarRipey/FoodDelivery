import { IFileDetails } from './../IFileDetails';
import { RestaurantAddress } from './RestaurantAddress';
import { RestaurantType } from './RestaurantType';
import { Guid } from 'guid-typescript';

export class RestaurantAddModel{
    public ownerId: Guid;
    public name: string;
    public description: string;
    public type: RestaurantType;
    public addresses?: RestaurantAddress[];

    public image?: IFileDetails;
}