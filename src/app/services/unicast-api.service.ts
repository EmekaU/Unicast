import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const URL = "http://localhost:8080" ;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class UserAPIService{

  constructor(private http: HttpClient){}

  signUpUser(user: User):Observable<string>{

    return this.http.post<string>(`${URL}/user/create`, JSON.stringify(user), {responseType: 'text' as 'json'})
  }

  signInUser(user: User): Observable<string>{

    return this.http.post<string>(`${URL}/user/login`, JSON.stringify(user), {responseType: 'text' as 'json'})
  }

  updateUser(user: User): Observable<string>{

    return this.http.get<string>(`${URL}/user/update`, httpOptions)
  }

  deleteUser(user: User): Observable<string>{

    return this.http.get<string>(`${URL}/user/update`, httpOptions)
  }

  getUser(username: string): Observable<JSON>{
    console.log(username)
    return this.http.get<JSON>(`${URL}/user/get/${username}`, {responseType: 'json'})
  }

}

@Injectable({
  providedIn: 'root'
})

export class SearchService{

  constructor(private http: HttpClient){}

  wildSearch(query: string){

    return this.http.get<JSON>(`${URL}/search/wild?query=${query}`, {responseType: 'json'})
  }
}


