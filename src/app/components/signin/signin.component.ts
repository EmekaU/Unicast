import { Component, OnInit } from '@angular/core';
import { UserAPIService } from 'src/app/services/unicast-api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  returnUrl: string;
  constructor(
    private httpUser: UserAPIService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'hub';
  }

  onSignIn(form: NgForm){
    let user = new User(form.value.username, form.value.password)

    // TODO: validate
    this.httpUser.signInUser(user).subscribe(
      data => {
        this.auth.saveJWTToLocalStorage(data)
        this.router.navigate([this.returnUrl])
      },

      error => {
        console.log(error)
        // TODO: Notify User of wrong Info
      });
  }
}
