import { OrderManagerFilterParams } from '../models/filters/OrderManagerFilterParams';
import { UserLogInModel } from '../models/auth/UserLogInModel';
import { serverUrl } from './../globals';
import { UserSignUpModel } from '../models/auth/UserSignUpModel';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfirmEmailModel } from '../models/auth/ConfirmEmailModel';
import { throwError, Observable } from 'rxjs';
import { UserProfile } from '../models/userProfile/UserProfile';
import { UserListResponse } from '../models/userProfile/UserListResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authUrl = serverUrl + "api/authentication/";
  
  constructor(private http: HttpClient) { }

  public signUp(userSignUpModel: UserSignUpModel){
    const url = this.authUrl + "signup";
    return this.http.post<UserSignUpModel>(url, userSignUpModel, { observe: "response" });
  }

  public retrieveOrderManagers(orderManagerFilterParams:OrderManagerFilterParams): Observable<UserListResponse>{
    const url = this.authUrl + "managers";
    return this.http.post<UserListResponse>(url, orderManagerFilterParams, { withCredentials: true });
  }

  public activateAccount(email: string){
    const url = this.authUrl + "activate";
    return this.http.post(url, JSON.stringify(email), 
      { withCredentials: true, headers: {'Content-Type': 'application/json' } });
  }

  public deactivateAccount(email: string){
    const url = this.authUrl + "deactivate";
    return this.http.post(url, JSON.stringify(email), 
      { withCredentials: true, headers: {'Content-Type': 'application/json' } });
  }

  public confirmEmail(confirmEmailModel: ConfirmEmailModel){
    const url = this.authUrl + "confirmEmail";
    return this.http.post<ConfirmEmailModel>(url, confirmEmailModel);
  }

  public logIn(userLogInModel: UserLogInModel){
    const url = this.authUrl + "login";
    return this.http.post<UserLogInModel>(url, userLogInModel,
       { withCredentials: true, observe: "response" }
      );
  } 

  public getUserProfile(): Observable<UserProfile>{
    const url = this.authUrl + "user";
    return this.http.get<UserProfile>(url, { withCredentials: true });
  }

  public sendCode(email: string){
    const url = this.authUrl + "sendcode";
    return this.http.post(url, JSON.stringify(email), { headers: {'Content-Type': 'application/json' }});
  }

  public logOut(){
    const url = this.authUrl + "logout";
    return this.http.post(url, null, { withCredentials: true });
  }
}
