import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { BehaviorSubject, Subject } from 'rxjs';
import { PodcastService } from './unicast-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor(private firebaseStore: AngularFireStorage, private podService: PodcastService, private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  getStorageRef(username: string, filename: string):AngularFireStorageReference {
    return this.firebaseStore.ref(`${username}/${filename}`)
  }

  upload(username, podcast, file){

    var storageRef:AngularFireStorageReference = this.getStorageRef(username, podcast["title"]);
    var uploadTask:AngularFireUploadTask = storageRef.put(file);
    let self = this;

    uploadTask.task.then(function(snapshot){
      console.log(snapshot)
      storageRef.getDownloadURL().subscribe( (data) =>{

        console.log("URL: ", data);
        podcast["url"] = data;

        self.podService.createPodcast(podcast).subscribe(
          result => {
            console.log(result);
            self.userService.forwardPodcasts.next(result);
            self.router.navigate([`/user-profile/${username}/podcasts`]);
          },
          
          error => {
            alert("Podcast was not created. Please try again");
          }
        )
      });
    });
  }
}
