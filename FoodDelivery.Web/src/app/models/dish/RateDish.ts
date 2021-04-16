import { Guid } from 'guid-typescript';

export class RateDish{
    public userId: Guid;
    public dishId: Guid;
    public rating: number;
}