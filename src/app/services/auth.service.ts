import { Injectable } from '@angular/core';
import * as jwt_decode from "jwt-decode";

const TOKEN_KEY = "unicast-loggedUser";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  saveJWTToLocalStorage(token: string){
    localStorage.setItem(TOKEN_KEY, token)
  }

  retrieveToken(){

    return localStorage.getItem(TOKEN_KEY)
  }

  deleteJWTFromLocalStorage(){

    localStorage.removeItem(TOKEN_KEY);
  }

  printToken(){

    let token = localStorage.getItem(TOKEN_KEY);
    console.log(this.getDecodedAccessToken(token));
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

}
