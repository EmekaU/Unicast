export class User {

  private email: string;
  private photo: File;

  constructor(private username,  private password){}

  getUsername(){
    return this.username;
  }

  getPassword(){
    return this.password;
  }

  getEmail(){
    return this.email;
  }

  getPhoto(){
    return this.photo;
  }

  setUsername(username: string){
    this.username = username
  }

  setPassword(password: string){
    this.password = password;
  }

  setEmail(email: string){
    this.email = email;
  }

  setPhoto(photo: File){
    this.photo = photo;
  }

}
