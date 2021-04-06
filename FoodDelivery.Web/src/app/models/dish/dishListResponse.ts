import { DishList } from 'src/app/models/dish/DishList';

export class DishListResponse{
    public dishes: DishList[];
    public totalDishesCount: number;
    public minPrice: number;
    public maxPrice: number;
}