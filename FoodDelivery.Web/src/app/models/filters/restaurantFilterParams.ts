import { RestaurantSortType } from '../enums/sorts/RestaurantSortType';
import { BaseFilterParams } from './BaseFilterParams';

export class RestaurantFilterParams extends BaseFilterParams{
    public types? : string[];
    public restaurantSortType: RestaurantSortType;
}