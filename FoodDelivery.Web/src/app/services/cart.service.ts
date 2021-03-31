import { cartItemModel } from './../models/cart/cartItemModel';
import { Observable } from 'rxjs';
import { cartResponse } from './../models/cart/cartResponse';
import { serverUrl } from './../app.module';
import { HttpClient } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { AddToCartComponent } from '../components/cart/add-to-cart/add-to-cart.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartUrl = serverUrl + "api/cart";

  constructor(private modalSevice: NgbModal, private http: HttpClient) { }

  public openAddToCart(dishId: Guid){
    const modal = this.modalSevice.open(AddToCartComponent);
    modal.componentInstance.dishId = dishId;
  }

  public get(): Observable<cartResponse>{
    const url = this.cartUrl;
    return this.http.get<cartResponse>(url, { withCredentials: true });
  }

  public post(cartItemModel: cartItemModel){
    const url = this.cartUrl;
    return this.http.post(url, cartItemModel, { withCredentials: true });
  }
}
