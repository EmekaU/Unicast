import { Component, OnInit , CUSTOM_ELEMENTS_SCHEMA, OnDestroy, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchService } from "../../services/unicast-api.service";
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  list = []
  subscription: Subscription;
  constructor(private searchService: SearchService) { }

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

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
