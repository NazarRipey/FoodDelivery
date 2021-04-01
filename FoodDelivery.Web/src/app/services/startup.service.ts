import { cartHelper } from './../helpers/cartHelper';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { userHelper } from './../helpers/userHelper';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StartupService {

  constructor(private userHelper:userHelper, private cartHelper: cartHelper) { }

  load(): Promise<any> {
    return forkJoin([
      this.userHelper.getProfile().pipe(mergeMap(x => {
        if(x){
          return forkJoin([this.userHelper.getOwnerRequest(x.id), this.cartHelper.getTotal()])
        }
        else{
          return of(x);
        }
      }))
    ]).toPromise();
  }
}
