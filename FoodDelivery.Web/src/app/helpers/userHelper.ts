import { CartHelper } from './CartHelper';
import { OwnerRequestStatus } from '../models/enums/statuses/OwnerRequestStatus';
import { Guid } from 'guid-typescript';
import { OwnerRequestService } from '../services/owner-request.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { concatMap, mergeMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UserLogInModel } from '../models/auth/UserLogInModel';
import { throwError, Observable, BehaviorSubject, Subject, forkJoin, concat, merge, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { UserProfile } from '../models/userProfile/UserProfile';

@Injectable({
    providedIn: 'root'
})
export class UserHelper{
    constructor(private authService: AuthenticationService, 
        private router:Router,
        private ownerRequestService:OwnerRequestService,
        private cartHelper: CartHelper)
    {}

    private _profile = new BehaviorSubject<UserProfile>(null);
    private _ownerRequestStatus = new BehaviorSubject<OwnerRequestStatus>(null);

    public get profile(){
        return this._profile.value;
    }

    public get ownerRequestStatus(){
        return this._ownerRequestStatus.value;
    }

    public getOwnerRequest(id: Guid):Observable<OwnerRequestStatus>{
        var result = this.ownerRequestService.getStatus(id);
        if(!this._ownerRequestStatus.getValue()){
            result.subscribe(s => {
                this._ownerRequestStatus.next(s);
            })
        }

        return result;
    }

    public getProfile(): Observable<any>{
        var result = this.authService.getUserProfile().pipe(
            concatMap(p => {
                this._profile.next(p);
                if(p){
                    if(p.roles.includes("customer")){
                        return forkJoin([this.getOwnerRequest(p.id), this.cartHelper.getInfo()]).toPromise();
                    }
                    
                    return forkJoin([this.getOwnerRequest(p.id)]).toPromise();
                }
                else{
                    return of(p);
                }
            })
        );

        if(!this._profile.getValue()){
            result.subscribe();
        }

        return result;
    }

    public isLoggedIn(): boolean{
        return this.profile ? true: false;
    }

    public isInRole(roles: string[]): boolean{
        if(this.isLoggedIn()){
            return this.profile.roles.some(r => roles.includes(r));
        }

        return false;
    }

    public LogIn(logInModel: UserLogInModel): Observable<HttpErrorResponse>{
        let result = this.authService.logIn(logInModel);

        let response = new Subject<HttpErrorResponse>();

        result.subscribe( _ => {
            this.getProfile().subscribe(
                r => {
                    if(this._profile.value != null)
                    {
                        if(this._profile.value.roles.includes("admin"))
                        {
                            this.router.navigateByUrl("/requests");
                        }
                    }
                }
            );

            response.next(null)
            response.complete();
        }, error => {
            /*Error*/
            response.next(error)
            response.complete();
        });     
        
        return response;
    }

    public LogOut(){
        this.authService.logOut().subscribe(_ => {
            this._profile.next(null)
            this._ownerRequestStatus.next(null);
            this.cartHelper.info = null;
            this.cartHelper.stopTimer();
            this.router.navigateByUrl("");
        });       
    }   
}