import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { DOCUMENT } from '@angular/common';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  // providers: [DOCUMENT],
})


export class ContactComponent implements OnInit {

  constructor(private apiService: ApiService) {
    this.apiService.user()
      .subscribe(
        data => {
          this.extractInfo(data)
        }
      )
  }

  // firstname: any = '';
  // lastname: any = '';
  // email: any = '';
  // _id: any = '';
  // bio: any = "";
  // gender: any = "";
  // hobby: any = "";
  // location: any = "";
  // twitterName: any = "";
  // githubName: any = "";
  // userLocation: any = "";
  buildUrlTwitter: any = "";
  buildUrlGithub: any = "";

  extractInfo(data) {
    // this.firstname = data.firstname;
    // this.lastname = data.lastname;
    // this.email = data.email;
    // this._id = data._id;
    // this.bio = data.bio;
    // this.location = data.location;
    // this.githubName = data.githubName;
    // this.twitterName = data.twitterName;
    // this.gender = data.gender;
    // this.hobby = data.hobby;
  }

  ngOnInit() {
    // this.apiService.resetForm();
    // this.apiService.refreshUser();
    
  }

  goToGitUrl() {
    // console.log("here" + this.apiService.selectedUser['githubName'])
    this.buildUrlGithub = "https://github.com/" + this.apiService.selectedUser['githubName'];
    window.location.href = this.buildUrlGithub;
  }

  goToTwitterUrl() {
    this.buildUrlTwitter = "https://twitter.com/" + this.apiService.selectedUser['twitterName'];
    window.location.href = this.buildUrlTwitter;
  }

}
