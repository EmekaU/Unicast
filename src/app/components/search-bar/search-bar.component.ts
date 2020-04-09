import { Component, OnInit , CUSTOM_ELEMENTS_SCHEMA, OnDestroy, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchService } from "../../services/unicast-api.service";
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageUtil } from 'src/app/utilities/image-util';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  list:Array<any>
  subscription: Subscription;
  constructor(
    private searchService: SearchService,
    private sanitizer: DomSanitizer,
    private imgUtil: ImageUtil,
    private router: Router,
    private userService: UserService) {}

  ngOnInit(): void {}

  search(f: NgForm){
    this.subscription = this.searchService.wildSearch(f.value.query).subscribe(
      data => {
        this.list = this.SortAndLoadList(data["users"], data["podcasts"]);
      },
      error => console.log(error),
      () => console.log("completed")
    )
  }

  SortAndLoadList(userList:Array<any>, podcastList: Array<any>){

    return userList.concat(podcastList)
  }

  getImagePath(photoURL: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.imgUtil.getImgUrl(photoURL));
  }

  redirectToUserProfile(userObject: JSON){
    this.userService.forwardUser.next(userObject);
    this.router.navigate([`user-profile/${userObject["username"]}`])
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
