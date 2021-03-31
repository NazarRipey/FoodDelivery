import { dishSortType } from '../enums/sorts/dishSortType';
import { baseFilterParams } from './baseFilterParams';

export class dishFilterParams extends baseFilterParams{
    public restaurants? : string[];
    public categories? : string[];
    public dishSortType: dishSortType;
    public minPrice: number;
    public maxPrice: number;
}