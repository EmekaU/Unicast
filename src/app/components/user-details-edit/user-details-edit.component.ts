import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(
    private apiUser: UserAPIService,
    private auth: AuthService
    ) { }

  ngOnInit(): void {}

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
      self.userData['photo'] = base64String;
    };

    reader.readAsDataURL(input.files[0]);

  }

  save(f: NgForm){
    let userData = {
      'username': this.userData['username'],
      'bio': this.userData['bio'],
      'email': this.userData['email'],
      'photo': this.userData['photo']
    }
    this.subscription = this.apiUser.updateUser(userData).subscribe(
      token => {
        this.auth.saveJWTToLocalStorage(token);
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
    this.subscription.unsubscribe();
  }

}
