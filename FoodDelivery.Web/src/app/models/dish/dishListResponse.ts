import { dishListObject } from 'src/app/models/dish/dishListObject';
export class dishListResponse{
    public dishes: dishListObject[];
    public totalDishesCount: number;
    public minPrice: number;
    public maxPrice: number;
}