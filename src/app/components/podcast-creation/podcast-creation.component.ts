import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PodcastService } from 'src/app/services/unicast-api.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-podcast-creation',
  templateUrl: './podcast-creation.component.html',
  styleUrls: ['./podcast-creation.component.scss']
})
export class PodcastCreationComponent implements OnInit {

  file;
  username: string = '';
  uploadProgress = new Observable();
  constructor(private podService: PodcastService, private route:ActivatedRoute, private firebaseStore:FirebaseStorageService) { }

  ngOnInit(): void {
    this.username = this.route.parent.snapshot.paramMap.get('username');
  }

  // trackProgress(){
  //   this.firebaseStore.progressReport.subscribe(
  //     data => {
  //       this.uploadProgress = data;
  //     }
  //   );
  // }

  storeFile(event){
    this.file = event.target.files[0];
  }

  upload(form: NgForm){

    let podcast: {} = {};

    podcast["title"] = form.value.title;
    podcast["description"] = form.value.description;
    podcast["category"] = "comedy";
    console.log(this.file)

    this.firebaseStore.upload(this.username, podcast["title"], this.file);
    this.firebaseStore.forwardUrl.subscribe(
      url => {
        if(url != null && url != ""){
          podcast["downloadURL"] = url;
          this.podService.createPodcast(podcast).subscribe(
            result => {
              console.log(result);
            },
            error => {console.log(error);}
          );
        }
        else{
          console.log(`Invalid URL: ${url}`);
        }
      });
  }

}
