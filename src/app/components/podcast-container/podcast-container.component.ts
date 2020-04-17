import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PodcastService } from 'src/app/services/unicast-api.service';
import { take, finalize } from 'rxjs/operators';

//
// THIS COMPONENT IS USED IN THE HUB AND USER PROFILE
//

@Component({
  selector: 'app-podcast-container',
  templateUrl: './podcast-container.component.html',
  styleUrls: ['./podcast-container.component.scss']
})
export class PodcastContainerComponent implements OnInit {
  
  loading: boolean;
  type: string;
  category: string;
  podcasts = [];

  constructor(private route: ActivatedRoute, private router: Router, private podcastAPI: PodcastService) {}

  ngOnInit(): void {

    

    //this.router.navigate(["podcasts/recent"], {relativeTo: this.route})
    //First get the type, then query. Use both values to retrieve podcasts.
    this.route.paramMap.subscribe(
      ParamData => {
        // Get Param
        this.type = ParamData['params']["type"] || "" ;

        // Get QueryParam
        this.route.queryParamMap.subscribe(
          queryData => {
            this.category = queryData['params']["category"];

            this.loading = true
            // Get Podcasts
            this.podcastAPI.getPodcasts(this.type, this.category).pipe(
              finalize(() => this.loading = false)).subscribe(
              podcasts => {
                this.podcasts = podcasts;
              },
              error => { // TODO:
                //this.router.navigate(['../'], {relativeTo: this.route})
                //OR
                //Something that makes more sense
                // Remember this component is used in the Hub and User Profile
            });
        });
    });
  }
}
