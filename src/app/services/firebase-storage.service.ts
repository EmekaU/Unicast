import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  forwardUrl = new Subject();
  constructor(private firebaseStore: AngularFireStorage) { }

  getStorageRef(username: string, filename: string):AngularFireStorageReference {
    return this.firebaseStore.ref(`${username}/${filename}`)
  }

  upload(username, title, file){

    var storageRef:AngularFireStorageReference = this.getStorageRef(username, title);
    var uploadTask:AngularFireUploadTask = storageRef.put(file);

    uploadTask.task.then(function(snapshot){
      console.log(snapshot);
      storageRef.getDownloadURL().subscribe( (data) =>{
        this.forwardUrl(data)
      });
    });
  }
}
