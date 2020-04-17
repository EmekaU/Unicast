import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit,OnDestroy {

  subscriptions: [] = null;
  subscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.subscription = this.userService.forwardSubscriptions.subscribe( (data: []) => {
      this.subscriptions = data;
      console.log(this.subscriptions);
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
