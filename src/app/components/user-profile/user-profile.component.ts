import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserAPIService } from 'src/app/services/unicast-api.service';
import { ImageUtil } from 'src/app/utilities/image-util';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user = {};
  isLoggedInUser = this.user["username"] == this.user["username"]//"currentUser's Username";
  navigated: boolean;
  subscription: Subscription;

  constructor(private userService: UserService, router: Router, private route: ActivatedRoute, private apiUser: UserAPIService, private imgUtils: ImageUtil) {
    this.navigated = router.navigated;
  }

  toggleSubscription(){
    let username = this.route.snapshot.paramMap.get("username");
    // call function to subscribe to this user
  }

  ngOnInit(): void {
    if(this.navigated){
      this.subscription = this.userService.forwardUser.subscribe(userObject => {
        this.user = userObject;
        this.user['photo'] = this.imgUtils.getImgUrl(this.user['photo']);
      });
    } else {
      this.subscription = this.apiUser.getUser(this.route.snapshot.paramMap.get('username')).subscribe( (data: JSON) => {
        this.user = data;
        this.user['photo'] = this.imgUtils.getImgUrl(this.user['photo']);
      });
    }
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
