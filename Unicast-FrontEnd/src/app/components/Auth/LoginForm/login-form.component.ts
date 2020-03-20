import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAPIService } from "../../../services/unicast-api.service";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from "../../../models/user.model";
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup

  constructor(private httpUser: UserAPIService , private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

    // TODO: Check if user is authenticated, [Utilize Guard]
  }
  onSubmit(): void {
    console.log(this.loginForm)
  }

  onSignUp(form: NgForm){
    let user = new User(form.value.username, form.value.password)
    user.setEmail(form.value.email)
    console.log(form);
    console.log(user)

    this.httpUser.signUpUser(user).subscribe( res => {
      console.log(res.headers)
      this.auth.saveJWTToLocalStorage(res.headers.get("token"))
      this.auth.printToken()
      console.log(this.auth.getDecodedAccessToken(res.headers.get("token")))
      this.router.navigate(["/hub"])
      // route to hub or page user redirected from.
    });

  }
}
