import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  progressReport = new BehaviorSubject(new Observable<number>());
  forwardUrl = new Subject();
  constructor(private firebaseStore: AngularFireStorage) { }

  getStorageRef(username: string, filename: string):AngularFireStorageReference {
    return this.firebaseStore.ref(`${username}/${filename}`)
  }

  upload(username, title, file){

    var uploadTask:AngularFireUploadTask = this.getStorageRef(username, title).put(file);
    console.log("getting url...")
    uploadTask.then(function(snapshot){
      console.log(snapshot.downloadURL)
      this.forwardUrl(snapshot.downloadURL);
    })
  }
}
