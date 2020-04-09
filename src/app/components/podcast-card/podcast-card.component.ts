import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-podcast-card',
  templateUrl: './podcast-card.component.html',
  styleUrls: ['./podcast-card.component.scss']
})
export class PodcastCardComponent implements OnInit {

  constructor() { }
  podcast: {}
  ngOnInit(): void {}


  play(){

  }

}
