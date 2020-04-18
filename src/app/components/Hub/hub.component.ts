import { Component, OnInit } from '@angular/core';
import { UserAPIService } from 'src/app/services/unicast-api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ImageUtil } from "src/app/utilities/image-util";
@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss']
})
export class HubComponent implements OnInit {

  user:JSON = null

  constructor(private userApi: UserAPIService, private auth: AuthService, private imgUtils: ImageUtil, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userApi.getUser(this.auth.getDecodedAccessToken(this.auth.retrieveToken())["username"]).subscribe(
      user => {
        this.user = user;
      },

      error => {
        alert("User not found");
        this.router.navigate([""]);
      },
      
      () => {

      }
    )
  }

  redirectToUserProfile(){
    this.userService.forwardUser.next(this.user);
    this.router.navigate([`/user-profile/${this.user["username"]}`]);
  }

  getImgPath(){
    return this.imgUtils.getImgUrl(this.user["photo"]);
  }

}
