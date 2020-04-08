import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  type: String;

   categories = ['Comedy', 'Educational', 'Lifestyle', 'Misc']
   podcasts = ['Popular', 'Recommended', 'Recent']
   
  
  constructor(private router: Router, private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    // TODO: Might need to reload a pre-set category from here
    this.type = this.categories[0]
  }

  showPodcast(){
    this.router.navigate(['podcasts',this.type], {relativeTo: this.route})
    // struggled with this for so long. wow
    
  }

}
