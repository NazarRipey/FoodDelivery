import { DishSortType } from '../enums/sorts/DishSortType';
import { BaseFilterParams } from './BaseFilterParams';

export class DishFilterParams extends BaseFilterParams{
    public restaurants? : string[];
    public categories? : string[];
    public dishSortType: DishSortType;
    public minPrice: number;
    public maxPrice: number;
}