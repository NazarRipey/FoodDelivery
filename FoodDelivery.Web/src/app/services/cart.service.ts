import { CartInfo } from './../models/cart/CartInfo';
import { CartItemModel } from '../models/cart/CartItemModel';
import { Observable } from 'rxjs';
import { CartResponse } from '../models/cart/CartResponse';
import { serverUrl } from './../globals';
import { HttpClient } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { AddToCartComponent } from '../components/cart/add-to-cart/add-to-cart.component';
import { CartItem } from '../models/cart/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartUrl = serverUrl + "api/cart";

  constructor(private http: HttpClient) { }
  
  public getInfo(): Observable<CartInfo>{
    const url = this.cartUrl + "/info"
    return this.http.get<CartInfo>(url, { withCredentials: true });
  }

  public get(): Observable<CartResponse>{
    const url = this.cartUrl;
    return this.http.get<CartResponse>(url, { withCredentials: true });
  }

  public getItem(id: string): Observable<CartItem>{
    const url = this.cartUrl + `/item/${id}`;
    return this.http.get<CartItem>(url, { withCredentials: true });
  }

  public addItem(cartItemModel: CartItemModel){
    const url = this.cartUrl;
    return this.http.post(url, cartItemModel, { withCredentials: true });
  }

  public updateItem(id: Guid, quantity: number){
    const url = this.cartUrl + `/${id}`;
    return this.http.put(url, JSON.stringify(quantity), { withCredentials: true, headers: {'Content-Type': 'application/json' } });
  }

  public deleteItem(id: Guid){
    const url = this.cartUrl + `/item/${id}`;
    return this.http.delete(url, { withCredentials: true });
  }

  public deleteCart(){
    const url = this.cartUrl;
    return this.http.delete(url, { withCredentials: true });
  }
}