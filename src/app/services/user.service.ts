import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  forwardUser = new BehaviorSubject(JSON);
  // Behaviour subject holds onto the lat value that was sent, and emits it after a component subscribes to it.
  // A subject doesn't hold onto a value.
  constructor() { }

}
