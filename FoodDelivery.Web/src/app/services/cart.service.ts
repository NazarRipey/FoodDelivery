import { cartItemModel } from './../models/cart/cartItemModel';
import { Observable } from 'rxjs';
import { cartResponse } from './../models/cart/cartResponse';
import { serverUrl } from './../globals';
import { HttpClient } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { AddToCartComponent } from '../components/cart/add-to-cart/add-to-cart.component';
import { cartItem } from '../models/cart/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartUrl = serverUrl + "api/cart";

  constructor(private http: HttpClient) { }
  
  public getTotalItems(): Observable<number>{
    const url = this.cartUrl + "/total"
    return this.http.get<number>(url, { withCredentials: true });
  }

  public get(): Observable<cartResponse>{
    const url = this.cartUrl;
    return this.http.get<cartResponse>(url, { withCredentials: true });
  }

  public addItem(cartItemModel: cartItemModel){
    const url = this.cartUrl;
    return this.http.post(url, cartItemModel, { withCredentials: true });
  }

  public updateItem(id: Guid, quantity: number){
    const url = this.cartUrl + `/${id}`;
    return this.http.put(url, quantity, { withCredentials: true });
  }

  public deleteItem(id: Guid){
    const url = this.cartUrl + `/item/${id}`;
    return this.http.delete(url, { withCredentials: true });
  }

  public deleteCart(id: Guid){
    const url = this.cartUrl + `/${id}`;
    return this.http.delete(url, { withCredentials: true });
  }
}
