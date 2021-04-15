import { DishList } from "./DishList";

export class DishRestaurantListResponse{
    public dishes: DishList[];
    public totalDishesCount: number;
}