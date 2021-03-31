import { Guid } from 'guid-typescript';

export class restaurantAddress{
    id?: Guid;
    restaurantId: Guid;
    city: string;
    address: string;
}