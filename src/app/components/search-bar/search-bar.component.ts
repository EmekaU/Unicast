import { Component, OnInit , CUSTOM_ELEMENTS_SCHEMA, OnDestroy, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchService } from "../../services/unicast-api.service";
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageUtil } from 'src/app/utilities/image-util';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  list:Array<any>
  prefix = 'data:image/jpg;base64,';
  subscription: Subscription;
  constructor(private searchService: SearchService, private sanitizer: DomSanitizer, private imgUtil: ImageUtil) { }

  ngOnInit(): void {
  }

  search(f: NgForm){
    this.subscription = this.searchService.wildSearch(f.value.query).subscribe(
      data => {
        this.list = this.SortAndLoadList(data["users"], data["podcasts"]);
        console.log(this.list);
      },
      error => console.log(error),
      () => console.log("completed")
    )
  }

  SortAndLoadList(userList:Array<any>, podcastList: Array<any>){

    return userList.concat(podcastList)
  }

  getImagePath(photo: ArrayBuffer){
    console.log(this.prefix + this.imgUtil.getBase64(photo) + "\n\n")
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.prefix + this.imgUtil.getBase64(photo));
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
