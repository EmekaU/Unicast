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
  isSubscribed:boolean = false;
  navigated: boolean;
  subscription: Subscription;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private apiUser: UserAPIService, private imgUtils: ImageUtil, private auth: AuthService) {
    this.navigated = router.navigated;
  }
 
  ngOnInit(): void {

    this.myUsername = this.auth.getDecodedAccessToken(this.auth.retrieveToken())['username'];
    if(this.navigated){
      this.subscription = this.userService.forwardUser.subscribe(userObject => {
        this.user = userObject;
        this.isSubscribed = this.setSubscription(this.user);
        this.isLoggedInUser = this.user["username"] == this.myUsername;
        this.user['photo'] = this.imgUtils.getImgUrl(this.user['photo']);
        this.userService.forwardSubscriptions.next(this.user["subscriptions"]);
        this.forwardPodcasts();
        this.forwardSubscriptions();
      });
    } else {
      this.subscription = this.apiUser.getUser(this.route.snapshot.paramMap.get('username')).subscribe( (data: JSON) => {
        this.user = data;
        this.isSubscribed = this.setSubscription(this.user);
        this.isLoggedInUser = this.user["username"] == this.myUsername;
        this.user['photo'] = this.imgUtils.getImgUrl(this.user['photo']);
        this.forwardPodcasts();
        this.forwardSubscriptions();
      });
    }
  }

  modifyUser(data){
    this.editMode = false;
    if(data != null){
      this.user['photo'] = data['photo'];
      this.user['bio'] = data['bio'];
      this.user['email'] = data['email'];
    }
  }

  forwardPodcasts(){
    this.userService.forwardPodcasts.next(this.user["podcasts"]);
  }
  
  forwardSubscriptions(){
    this.userService.forwardSubscriptions.next(this.user["subscriptions"]);
  }

  setSubscription(user): boolean{
    //console.log(user)
    for (let key in user["subscribers"]){
      if(this.user["subscribers"][key]["id"]["subscriberId"] == this.myUsername){
        return true
      }
    }
    return false;
  }

  toggleSubscription(){
    console.log(this.isLoggedInUser)
    if(this.isLoggedInUser == false){
      this.apiUser.subscribe(this.myUsername, this.route.snapshot.paramMap.get('username')).subscribe(
        data => {
          console.log(data);
          this.isSubscribed = this.setSubscription(data); //': Alert User of new Subscription, toggle that user is now subscribed'
        },
        error => console.log('Alert user of error, do nothing') // modal service
      )
    }
    else{
      console.log('User attempted to subscribe to him/herself. Should not be possible')
    }
  }
  
  ngOnDestroy(): void{
    if(this.subscription != undefined && this.subscription != null){
      this.subscription.unsubscribe();
    }
  }
}