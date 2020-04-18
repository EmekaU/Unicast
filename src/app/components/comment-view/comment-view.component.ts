import { Component, OnInit, Input } from '@angular/core';
import { PodcastService } from 'src/app/services/unicast-api.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.scss']
})
export class CommentViewComponent implements OnInit {

  @Input() comments: string[] = [];
  @Input() id: number = null;

  constructor(private podcastApi: PodcastService) { }

  ngOnInit(): void {
    console.log(this.comments, this.id);
  }

  addComment(message: string){
    this.comments.push(message);
    this.podcastApi.addComments(message, this.id).subscribe(
      data => {
        console.log(data);
      },
      error => {

      },

      () => {

      }
    )
  }

}
