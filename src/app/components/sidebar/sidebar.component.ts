import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

   categories = ['Comedy', 'Educational', 'Lifestyle', 'Misc']
   podcasts = ['Popular', 'Recommended', 'Recent']


  constructor(private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
  }

  showPodcast(value){
    this.router.navigate(['podcasts', value], {relativeTo: this.route})
    // struggled with this for so long. wow

  }

}
