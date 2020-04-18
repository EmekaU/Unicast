import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserAPIService } from 'src/app/services/unicast-api.service';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit,OnDestroy {
 
  subscriptions: [] = null;
  subscription: Subscription;
  user: {} = {};

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private userApi: UserAPIService) { }

  ngOnInit(): void {
    this.subscription = this.userService.forwardSubscriptions.subscribe( (data: []) => {
      this.subscriptions = data;
      console.log(this.subscriptions);
    });

  }

  redirectToUserProfile(sub: Object){
    this.subscription = this.userApi.getUser(sub["id"]["subscribeToId"]).subscribe(
      userData => {
        this.userService.forwardUser.next(userData);
        this.router.navigateByUrl(`/user-profile/${sub["id"]["subscribeToId"]}`);
      }
    )

  }

  ngOnDestroy(){
    if(this.subscription != undefined && this.subscription != null){
      this.subscription.unsubscribe();

    }
  }

}
