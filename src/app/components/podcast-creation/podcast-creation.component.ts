import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PodcastBasicService } from 'src/app/services/podcast-service.service';

@Component({
  selector: 'app-podcast-creation',
  templateUrl: './podcast-creation.component.html',
  styleUrls: ['./podcast-creation.component.scss']
})
export class PodcastCreationComponent implements OnInit {

  constructor(private podService: PodcastBasicService) { }

  ngOnInit(): void {
  }

  upload(form: NgForm){
    this.podService.uploadPodcast(form);
  }

}
