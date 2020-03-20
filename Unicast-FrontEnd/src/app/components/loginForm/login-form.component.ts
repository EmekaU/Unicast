import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAPIService } from "../../services/unicast-api.service";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from "../../models/user.model";
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(private httpUser: UserAPIService , private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  onSignUp(form: NgForm){
    let user = new User(form.value.username, form.value.password)
    user.setEmail(form.value.email)

    this.httpUser.signUpUser(user).subscribe( data => {
      this.auth.saveJWTToLocalStorage(data)
      this.auth.printToken()
      this.router.navigate(["hub"])
      // route to hub or page user redirected from.
    });

  }
}
