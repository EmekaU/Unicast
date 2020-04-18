import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PodcastService } from 'src/app/services/unicast-api.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-podcast-view',
  templateUrl: './podcast-view.component.html',
  styleUrls: ['./podcast-view.component.scss']
})
export class PodcastViewComponent implements OnInit, OnDestroy {

  podcasts = [];
  username: string = '';
  navigated = false;
  subscription: Subscription = null;

  currentPodcast = {}
  
  constructor(private route:ActivatedRoute, private router: Router,
     private podcastAPI: PodcastService, private userService: UserService) { 
       this.navigated = router.navigated;
  }

  ngOnInit(): void {
    this.username = this.route.parent.snapshot.paramMap.get("username");
    if(this.navigated){
      this.subscription = this.userService.forwardPodcasts.subscribe(podcasts => {
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

  setCommentViewDetails(podcast:Object){
    this.currentPodcast = podcast;
    console.log(this.currentPodcast);
  }

  ngOnDestroy(){
    if(this.subscription != undefined && this.subscription != null){
      this.subscription.unsubscribe();
    }
  }
}
