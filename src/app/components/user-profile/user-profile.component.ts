import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserAPIService } from 'src/app/services/unicast-api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl:'./user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: JSON;
  navigated: boolean;
  subscription: Subscription;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private apiUser: UserAPIService) {
    this.navigated = router.navigated;
  }

  ngOnInit(): void {
    if(this.navigated){
      this.subscription = this.userService.forwardUser.subscribe(userObject => {
        this.user = userObject;
      });
    }
    else{
      this.subscription = this.apiUser.getUser(this.route.snapshot.paramMap.get('username')).subscribe( (data: JSON) => {
        this.user = data;
        console.log(this.user);
      });
    }

  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
