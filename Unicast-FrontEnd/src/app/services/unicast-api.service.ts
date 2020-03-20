import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const URL = "http://localhost:8080" ;

@Injectable({
  providedIn: 'root'
})

export class UserAPIService{

  constructor(private http: HttpClient){}

  signUpUser(user: User): Observable<HttpResponse<any>>{

    return this.http.post<string>(`${URL}/user/create`, JSON.stringify(user), {observe: 'response'})
  }

  // signInUser(user: User): Observable<string>{

  //   return this.http.get<string>(`${URL}/user/login`, httpOptions)
  // }

  // updateUser(user: User): Observable<string>{

  //   return this.http.get<string>(`${URL}/user/update`, httpOptions)
  // }

  // deleteUser(user: User): Observable<string>{

  //   return this.http.get<string>(`${URL}/user/update`, httpOptions)
  // }

  // getUser(username: string):Observable<string>{

  //   return this.http.get<string>(`${URL}/get/${username}`, httpOptions)
  // }

}


