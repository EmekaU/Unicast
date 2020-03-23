import { Component, OnInit , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  list = [{"name": "A", "value": "Podcast"}, {"name": "B", "value": "Podcast"}, {"name": "C", "value": "User"}, {"name": "D", "value": "Podcast"}, {"name": "E", "value": "User"}, {"name": "F", "value": "Podcast"}];
  constructor() { }

  ngOnInit(): void {

  }

  search(f: NgForm){
    console.log(f.value.query);
    // Do something with f.value.query
  }

}
