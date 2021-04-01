import { Observable, of } from 'rxjs';
import { CartService } from './../services/cart.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class cartHelper{
    public total: number;

    constructor(private cartService:CartService){
    }

    getTotal(): Observable<number>{
        var result = this.cartService.getTotalItems();

        result.subscribe(t => this.total = t);

        return result;
    }
}