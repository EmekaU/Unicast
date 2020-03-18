import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup

  constructor() { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      'username': new FormControl(null),
      'password': new FormControl(null)
    })
  }
  onSubmit(): void {
    console.log(this.loginForm)
  }

}
