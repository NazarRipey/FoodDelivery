import { sendConfirmationCodeModel } from '../models/auth/sendConfirmationCodeModel';
import { userLogInModel } from '../models/auth/userLogInModel';
import { serverUrl } from './../app.module';
import { userSignUpModel } from '../models/auth/userSignUpModel';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { confirmEmailModel } from '../models/auth/confirmEmailModel';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { userProfile } from '../models/userProfile/userProfile';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authUrl = serverUrl + "api/authentication/";
  
  constructor(private http: HttpClient) { }

  public signUp(userSignUpModel: userSignUpModel){
    const url = this.authUrl + "signup";
    return this.http.post<userSignUpModel>(url, userSignUpModel, { observe: "response" });
  }

  public confirmEmail(confirmEmailModel: confirmEmailModel){
    const url = this.authUrl + "confirmEmail";
    return this.http.post<confirmEmailModel>(url, confirmEmailModel);
  }

  public logIn(userLogInModel: userLogInModel){
    const url = this.authUrl + "login";
    return this.http.post<userLogInModel>(url, userLogInModel,
       { withCredentials: true, observe: "response" }
      );
  } 

  public getUserProfile(): Observable<userProfile>{
    const url = this.authUrl + "user";
    return this.http.get<userProfile>(url, { withCredentials: true });
  }

  public sendCode(sendCodeModel: sendConfirmationCodeModel){
    const url = this.authUrl + "sendcode";
    return this.http.post(url, sendCodeModel);
  }

  public logOut(){
    const url = this.authUrl + "logout";
    return this.http.post(url, null, { withCredentials: true });
  }
}
