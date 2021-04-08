import { CartInfo } from '../models/cart/CartInfo';
import { Observable, of } from 'rxjs';
import { CartService } from '../services/cart.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CartHelper{
    public interval;

    public info: CartInfo = new CartInfo();

    constructor(private cartService:CartService){
    }

    getInfo(): Observable<CartInfo>{
      var result = this.cartService.getInfo();
      result.subscribe(i => {
        this.info = i;
        this.startTimer();
      });
      return result;
    }

  startTimer() {
    if(this.info){
      if(!this.interval)
      {  
        this.interval = setInterval(() => {
          if(this.info.timeLeft > 1) {
            this.info.timeLeft--;
          } else {
            this.stopTimer();
            this.cartService.deleteCart().subscribe(_ => location.reload());
          }
        },1000)
      }
    }
  }
    
  stopTimer(){
    clearInterval(this.interval);
    this.interval = null;
  }
}