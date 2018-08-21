import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css']
})
export class ContactMeComponent implements OnInit {

  firstname: any = "";
  // buildUrlTwitter: any = "";
  // buildUrlGithub: any = "";

  constructor(private apiService: ApiService) {
    this.apiService.user()
      .subscribe(
        data => {
          this.extractInfo(data)
        }
      )
  }

  extractInfo(data) {
    this.firstname = data.firstname;
    // this.lastname = data.lastname;
    // this.email = data.email;
    // this._id = data._id;
    // this.bio = data.bio;
    // this.location = data.location;
    // this.githubName = data.githubName;
    // this.twitterName = data.twitterName;
    // this.gender = data.gender;
    // this.hobby = data.hobby;
    // this.profilePicture = data.profilePicture;
  }

  ngOnInit() {
    this.apiService.resetForm();
    this.apiService.refreshUser();
  }

  // goToGitUrl() {
  //   // console.log("here" + this.apiService.selectedUser['githubName'])
  //   this.buildUrlGithub = "https://github.com/" + this.apiService.selectedUser['githubName'];
  //   window.location.href = this.buildUrlGithub;
  // }

  // goToTwitterUrl() {
  //   this.buildUrlTwitter = "https://twitter.com/" + this.apiService.selectedUser['twitterName'];
  //   window.location.href = this.buildUrlTwitter;
  // }

}
