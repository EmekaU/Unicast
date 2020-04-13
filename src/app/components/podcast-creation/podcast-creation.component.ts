import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PodcastService } from 'src/app/services/unicast-api.service';
import { ActivatedRoute } from '@angular/router';
import * as JSZip from 'jszip';
@Component({
  selector: 'app-podcast-creation',
  templateUrl: './podcast-creation.component.html',
  styleUrls: ['./podcast-creation.component.scss']
})
export class PodcastCreationComponent implements OnInit {

  podcast: File = null;
  username: string = '';
  constructor(private podService: PodcastService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get("username");
  }

  zip(name, file){
    var zip = new JSZip();
    zip.file(name, file, {base64: true})
    return zip
  }

  upload(form: NgForm){

    let formData: {} = {};
    formData['file'] = this.zip("podcast", this.podcast);
    //formData["description"] = form.value.description;
    //formData["title"] = form.value.title;
    //formData["category"] =  "comedy";

    console.log(formData);
     this.podService.createPodcast(formData).subscribe(result => {
    //   console.log(result);
     }, 
     error => {
       console.log(error);
     } 
    );
  }

  setBase64String(event){
    this.podcast = event.target.files[0];
  }

}
