import { Router } from '@angular/router';
import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import {EMPTY, Observable, of, throwError} from "rxjs";
import {catchError, map} from 'rxjs/operators';
 
@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {
    
  constructor(private router: Router) {
  }
 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            if(error.status == 0)
            {
              document.writeln("No server connection, please try later.");
              return EMPTY;
            }
            else if(error.status == 500){
              alert("server side error occured, please try again later");
              console.log(error);
              return EMPTY;
            }
          }

          return throwError(error);
        })
      )
  }
}