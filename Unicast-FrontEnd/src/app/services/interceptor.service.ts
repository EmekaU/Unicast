import { Injectable } from '@angular/core';
import { UserAPIService } from "./unicast-api.service";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private userAuth: UserAPIService, private auth: AuthService, private router: Router) {}

  intercept(request: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent<any> > {

    const token = this.auth.retrieveToken();

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };

    if(token !+ null){
      request.headers.append('token', token)
    }

    request = request.clone(httpOptions)

    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          alert('Access Denied'); // Maybe have a modal here

          this.router.navigate([ '/' ]); //TODO: or perhaps 404?
          return throwError(error);
        }
        // If it is not an authentication error, just throw it
        return throwError(error);
      })
    );

  }
}
