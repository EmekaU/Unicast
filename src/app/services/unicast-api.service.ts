import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable} from 'rxjs';

const URL = "http://localhost:8080" ;
//const URL = "http://api.unicast.live/api";
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

  updateUser(user): Observable<string>{

    return this.http.post<string>(`${URL}/user/update`, JSON.stringify(user), {responseType: 'text' as 'json'})
  }

  deleteUser(user: User): Observable<string>{

    return this.http.get<string>(`${URL}/user/update`, httpOptions)
  }

  getUser(username: string): Observable<JSON>{
    return this.http.get<JSON>(`${URL}/user/get/${username}`, {responseType: 'json'})
  }

  subscribe(subscriber:string, subscribeTo:string){
    let json = {'subscriberid': subscriber, 'subscribetoid': subscribeTo}
    return this.http.post<any>(`${URL}/user/subscribe`, JSON.stringify(json))
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

@Injectable({
  providedIn: 'root'
})
export class PodcastService{

  constructor(private http: HttpClient){}

  getPodcasts(type: string, category: string){
    type = type == undefined? "": `/${type}`;;
    category = category == undefined? "": `?category=${category}`;
    return this.http.get<JSON>(`${URL}/podcast${type}${category}`, {responseType: 'json'})
  }

  createPodcast(data){
    // data should be url, title, etc.
    return this.http.post<JSON>(`${URL}/podcast/create`, data, {responseType: 'json'})
  }
}


