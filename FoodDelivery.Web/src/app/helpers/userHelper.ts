import { CartService } from './../services/cart.service';
import { ownerRequestStatus } from './../models/enums/statuses/ownerRequestStatus';
import { Guid } from 'guid-typescript';
import { OwnerRequestService } from './../services/owner-request.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { LogInComponent } from './../components/auth/log-in/log-in.component';
import { mergeMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { userLogInModel } from '../models/auth/userLogInModel';
import { throwError, Observable, BehaviorSubject, Subject, forkJoin } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { userProfile } from '../models/userProfile/userProfile';

@Injectable({
    providedIn: 'root'
})
export class userHelper{
    constructor(private authService: AuthenticationService, 
        private router:Router,
        private ownerRequestService:OwnerRequestService,
        private cartService:CartService)
    {}

    private _profile = new BehaviorSubject<userProfile>(null);
    private _ownerRequestStatus = new BehaviorSubject<ownerRequestStatus>(null);

    public get profile(){
        return this._profile.value;
    }

    public get ownerRequestStatus(){
        return this._ownerRequestStatus.value;
    }

    public getOwnerRequest(id: Guid):Observable<ownerRequestStatus>{
        var result = this.ownerRequestService.getStatus(id);
        if(!this._ownerRequestStatus.getValue()){
            result.subscribe(s => {
                this._ownerRequestStatus.next(s);
            })
        }

        return result;
    }

    public getProfile(): Observable<userProfile>{
        var result = this.authService.getUserProfile();
        if(!this._profile.getValue()){
            result.subscribe(
                p => {
                    this._profile.next(p);     
                },
            );
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

    public LogIn(logInModel: userLogInModel): Observable<HttpErrorResponse>{
        let result = this.authService.logIn(logInModel);

        let response = new Subject<HttpErrorResponse>();

        result.subscribe( _ => {
            this.getProfile().subscribe(
                r => {
                    if(this._profile)
                    {
                        this.getOwnerRequest(this.profile.id).subscribe();
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
            this.router.navigateByUrl("");
        });       
    }   
}