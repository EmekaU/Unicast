export class User {

  private email: string;
  private photo: string;

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

  setPhoto(photo: string){
    this.photo = photo;
  }

}

export class loggedInUser{

  constructor(
    private id: number,
    private username: string,
    private bio: string,
    private photo: string,
    private email: string,
    private podcasts: [],
    private subscribers: [],
    private subscriptions: []

    ){}

    load(source){
      Object.assign(this, source)
    }

}
