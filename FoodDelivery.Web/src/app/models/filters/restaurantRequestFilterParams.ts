import { baseFilterParams } from './baseFilterParams';

export class restaurantRequestFilterParams extends baseFilterParams{
    public status: number;
    public sort: number;
    public asc: boolean;
}