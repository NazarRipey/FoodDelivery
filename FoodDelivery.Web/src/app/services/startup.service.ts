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

  constructor(private userHelper:userHelper) { }

  load(): Promise<any> {
    return forkJoin([
      this.userHelper.getProfile()
    ]).toPromise();
  }
}
