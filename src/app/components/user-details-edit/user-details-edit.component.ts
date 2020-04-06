import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details-edit',
  templateUrl: './user-details-edit.component.html',
  styleUrls: ['./user-details-edit.component.scss']
})
export class UserDetailsEditComponent implements OnInit {

  user = {};
  isLoggedInUser = true;
  constructor() { }

  ngOnInit(): void {
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
      self.user['photo'] = base64String;
    };

    reader.readAsDataURL(input.files[0]);

  }

  logOut(){
    //TODO: Nullify token, redirect to login page.
  }
}
