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
    console.log(uploadTask.task.snapshot.state);
    this.progressReport.next(uploadTask.percentageChanges()) // notify podcast creation component of progress
    console.log("getting url...")
    uploadTask.task.snapshot.ref.getDownloadURL().then( (url)=>{
      this.forwardUrl.next(url);
    });
  }

}
