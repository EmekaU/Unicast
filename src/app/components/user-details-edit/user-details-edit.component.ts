import { Component, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-user-details-edit',
  templateUrl: './user-details-edit.component.html',
  styleUrls: ['./user-details-edit.component.scss']
})
export class UserDetailsEditComponent implements OnInit {
  @Input() userData: {};
  @Output() userDataChange = new EventEmitter();

  constructor(private router: Router, private route:ActivatedRoute) { }

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
      self.userData['photo'] = base64String;
    };

    reader.readAsDataURL(input.files[0]);

  }

  save(f: NgForm){
    let userData = {}
    userData["bio"] = f.value.bio;
    userData["photo"] = this.userData['photo'];
    userData["email"] = f.value.email;

    this.userDataChange.emit(JSON.stringify(userData));
  }

}
