import { BaseFilterParams } from './BaseFilterParams';

export class RestaurantRequestFilterParams extends BaseFilterParams{
    public status: number;
    public sort: number;
    public asc: boolean;
}