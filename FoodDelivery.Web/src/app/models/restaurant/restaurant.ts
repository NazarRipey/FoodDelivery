import { dish } from 'src/app/models/dish/dish';
import { Guid } from 'guid-typescript';
import { restaurantType } from './restaurantType';
import { restaurantAddress } from './restaurantAddress';

export class restaurant{
    public id?: Guid;
    public ownerId: Guid;
    public name: string;
    public description: string;
    public rating?: number;
    public type: restaurantType;
    public addresses?: restaurantAddress[];
    public dishes?: dish[];
}