import { userHelper } from './../helpers/userHelper';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';

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
