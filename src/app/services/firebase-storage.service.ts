import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor(private firebaseStore: AngularFireStorage) { }

  forwardUrl = new BehaviorSubject("");

  getStorageRef(username: string, filename: string):AngularFireStorageReference {
    return this.firebaseStore.ref(`${username}/${filename}`)
  }

  upload(username, title, file){

    var storageRef:AngularFireStorageReference = this.getStorageRef(username, title);
    var uploadTask:AngularFireUploadTask = storageRef.put(file);
    let self = this;

    uploadTask.task.then(function(snapshot){
      storageRef.getDownloadURL().subscribe( (data) =>{
        console.log("URL: ", data);
        self.forwardUrl.next(data);
      });
    });
  }
}
