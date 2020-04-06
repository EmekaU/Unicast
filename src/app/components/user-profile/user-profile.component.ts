import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserAPIService } from 'src/app/services/unicast-api.service';
import { ImageUtil } from 'src/app/utilities/image-util';
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user = {};
  editMode = false;
  myUsername = null;
  isLoggedInUser = null;
  navigated: boolean;
  subscription: Subscription;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private apiUser: UserAPIService, private imgUtils: ImageUtil, private auth: AuthService) {
    this.navigated = router.navigated;
  }

  toggleSubscription(){
    console.log(this.isLoggedInUser)
    if(this.isLoggedInUser == false){
      this.apiUser.subscribe(this.myUsername, this.route.snapshot.paramMap.get('username')).subscribe(
        data => console.log(data+ ': Alert User of new Subscription, toggle that user is now subscribed'),
        error => console.log('Alert user of error, do nothing')
      )
    }
    else{
      console.log('User attempted to subscribe to him/herself. Should not be possible')
    }
  }

  ngOnInit(): void {

    this.myUsername = this.auth.getDecodedAccessToken(this.auth.retrieveToken())['username'];

    if(this.navigated){
      this.subscription = this.userService.forwardUser.subscribe(userObject => {
        this.user = userObject;
        this.isLoggedInUser = this.user["username"] == this.myUsername;
        this.user['photo'] = this.imgUtils.getImgUrl(this.user['photo']);
      });
    } else {
      this.subscription = this.apiUser.getUser(this.route.snapshot.paramMap.get('username')).subscribe( (data: JSON) => {
        this.user = data;
        this.isLoggedInUser = this.user["username"] == this.myUsername;
        this.user['photo'] = this.imgUtils.getImgUrl(this.user['photo']);
      });
    }
  }

  modifyUser(event){
    console.log(event)
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
