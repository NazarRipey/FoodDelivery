import { restaurantStatus } from './../enums/statuses/restaurantStatus';
import { dishObject } from '../dish/dishObject';
import { Guid } from 'guid-typescript';
import { restaurantType } from './restaurantType';
import { restaurantAddress } from './restaurantAddress';

export class restaurantDetailObject{
    public id?: Guid;
    public ownerId: Guid;
    public name: string;
    public description: string;
    public rating?: number;
    public type: restaurantType;
    public addresses?: restaurantAddress[];
    public status?: restaurantStatus;
    public dishes?: dishObject[];
}