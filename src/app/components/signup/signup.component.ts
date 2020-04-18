import { Component, OnInit } from '@angular/core';
import { UserAPIService } from 'src/app/services/unicast-api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { take, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  loading: boolean

  constructor(private httpUser: UserAPIService , private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.deleteJWTFromLocalStorage();
  }

  onSignUp(form: NgForm){
    this.loading = true
    let user = new User(form.value.username, form.value.password)
    user.setEmail(form.value.email)

    this.httpUser.signUpUser(user).pipe(
      finalize(() => this.loading = false)).subscribe( data => {
      this.auth.saveJWTToLocalStorage(data)
      this.auth.printToken()
      this.router.navigate(["hub/podcasts/all"])
      // route to hub or page user redirected from.
    },
    error => {
      alert(`User ${form.value.username} already exists. Please try again with a different username`);
    },

    () => {
      // Call succesfully completed
    });

  }
}
