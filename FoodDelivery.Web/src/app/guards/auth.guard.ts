import { LogInComponent } from './../components/auth/log-in/log-in.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { userHelper } from './../helpers/userHelper';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userHelper: userHelper, private modalService: NgbModal){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.userHelper.isLoggedIn()){
        return true;
      }
      else{
        this.modalService.open(LogInComponent);   
      }
  }
}
