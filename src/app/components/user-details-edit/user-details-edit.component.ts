import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAPIService } from 'src/app/services/unicast-api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-details-edit',
  templateUrl: './user-details-edit.component.html',
  styleUrls: ['./user-details-edit.component.scss']
})
export class UserDetailsEditComponent implements OnInit, OnDestroy {
  @Input() userData: {};
  @Output() userDataChange = new EventEmitter<Object>();

  subscription: Subscription;
  photo: string = '';

  constructor(
    private apiUser: UserAPIService,
    private auth: AuthService
    ) { }

  ngOnInit(): void {
    this.photo = this.userData["photo"];
  }

  openDialog(){
    document.getElementById('file-upload').click();
  }

  setImageURL(event){

    const input = event.target;
    const reader = new FileReader();
    const self = this;
    let base64String;

    reader.onloadend = function(){

      base64String = reader.result;
      self.photo = base64String;
    };

    reader.readAsDataURL(input.files[0]);

  }

  save(f: NgForm){
    let userData = {
      'username': this.userData["username"],
      'bio': f.value.bio,
      'email': f.value.email,
      'photo': this.photo
    }
    this.subscription = this.apiUser.updateUser(userData).subscribe(
      token => {
        this.auth.saveJWTToLocalStorage(token);
        console.log("saved")
        this.userDataChange.emit(userData);
      },
      error => {
        // Let user know that data wasn't updated.
      }
    )
  }

  cancel(){
    this.userDataChange.emit(null);
  }
  
  ngOnDestroy(){
    if(this.subscription != null && this.subscription != undefined){
      this.subscription.unsubscribe();
    }
  }
}