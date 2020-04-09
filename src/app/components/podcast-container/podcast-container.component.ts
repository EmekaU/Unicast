import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-podcast-container',
  templateUrl: './podcast-container.component.html',
  styleUrls: ['./podcast-container.component.scss']
})
export class PodcastContainerComponent implements OnInit {
  type: String

  constructor(private route: ActivatedRoute, private router: Router) {

   }

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      data => {
        this.type = data['params']["type"];
    });
  }

}
