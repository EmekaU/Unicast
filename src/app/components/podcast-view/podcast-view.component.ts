import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PodcastService } from 'src/app/services/unicast-api.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-podcast-view',
  templateUrl: './podcast-view.component.html',
  styleUrls: ['./podcast-view.component.scss']
})
export class PodcastViewComponent implements OnInit {

  podcasts = [];
  username: string = '';
  navigated = false;
  subscription: Subscription = null;
  
  constructor(private route:ActivatedRoute, private router: Router,
     private podcastAPI: PodcastService, private userService: UserService) { 
    this.navigated = router.navigated;
  }

  ngOnInit(): void {
    this.username = this.route.parent.snapshot.paramMap.get("username");
    if(this.navigated){
      this.subscription = this.userService.forwardUserField.subscribe(podcasts => {
        this.podcasts = podcasts;
        console.log(this.podcasts);
      });
    } else {
      this.subscription = this.podcastAPI.getPodcastsBelongingTo(this.username).subscribe(
        podcasts => {
          this.podcasts = podcasts;
        },
        error => {

        }
      )
    }
  }
}
