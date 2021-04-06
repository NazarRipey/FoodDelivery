import { CartHelper } from '../helpers/CartHelper';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { UserHelper } from '../helpers/UserHelper';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StartupService {

  constructor(private userHelper:UserHelper) { }

  load(): Promise<any> {
    return forkJoin([
      this.userHelper.getProfile()
    ]).toPromise();
  }
}
