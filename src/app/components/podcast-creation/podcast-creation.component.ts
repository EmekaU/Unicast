import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PodcastService } from 'src/app/services/unicast-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { take, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-podcast-creation',
  templateUrl: './podcast-creation.component.html',
  styleUrls: ['./podcast-creation.component.scss']
})
export class PodcastCreationComponent implements OnInit {

  file;
  username: string = '';
  loading: boolean;
  uploadProgress = new Observable();
  constructor(private podService: PodcastService, private userService: UserService, 
     private route:ActivatedRoute, private router: Router,
      private firebaseStore:FirebaseStorageService) { }

  ngOnInit(): void {
    this.username = this.route.parent.snapshot.paramMap.get('username');
  }

  trackProgress(){
    // TODO: Change this to just the number. Show modal until it gets to 100%;
    this.firebaseStore.progressReport.subscribe(
      data => {
        this.uploadProgress = data;
      }
    ).unsubscribe();
  }

  storeFile(event){
    this.file = event.target.files[0];
  }

  upload(form: NgForm){
    this.loading = true

    let podcast: {} = {};

    podcast["title"] = form.value.title;
    podcast["description"] = form.value.description;
    podcast["category"] = form.value.category;

    this.firebaseStore.upload(this.username, podcast["title"], this.file);
    this.trackProgress();
    this.firebaseStore.forwardUrl.subscribe(
      url => {
        if(url != null && url != ""){
          podcast["url"] = url;
          this.podService.createPodcast(podcast).pipe(
            finalize(() => this.loading = false)).subscribe(
            result => {
              console.log(result);
              this.userService.forwardPodcasts.next(result);
              this.router.navigate(["../podcasts"]);
            },
            error => {console.log(error);}
          )
        }
        else{
          console.log(`Invalid URL: ${url}`);
        }
      })
  }
}
