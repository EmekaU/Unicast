import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.scss']
})
export class CommentViewComponent implements OnInit {

  @Input() comments: [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.comments)
  }

}
