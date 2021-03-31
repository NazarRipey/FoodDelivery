import { restaurantSortType } from '../enums/sorts/restaurantSortType';
import { baseFilterParams } from './baseFilterParams';

export class restaurantFilterParams extends baseFilterParams{
    public types? : string[];
    public restaurantSortType: restaurantSortType;
}