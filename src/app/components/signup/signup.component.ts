import { Component, OnInit } from '@angular/core';
import { UserAPIService } from 'src/app/services/unicast-api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private httpUser: UserAPIService , private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSignUp(form: NgForm){
    let user = new User(form.value.username, form.value.password)
    user.setEmail(form.value.email)

    this.httpUser.signInUser(user).subscribe( data => {
      this.auth.saveJWTToLocalStorage(data)
      this.auth.printToken()
      this.router.navigate(["hub"])
      // route to hub or page user redirected from.
    });

  }
}
