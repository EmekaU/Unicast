import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PodcastBasicService {

  constructor() { }

  uploadPodcast(form: NgForm){
    let title = form.value.title;
    let description = form.value.description;
    let podcast = form.value.podcast;

    const formData: FormData = new FormData();
    // formData.append('file', 'file', podcast.name);
    formData.append("description", description);
    formData.append("title", title);

    console.log(formData);
  }
}
