import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { DOCUMENT } from '@angular/common';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  // providers: [DOCUMENT],
})


export class ContactComponent implements OnInit {

  profilePicture: any = '';
  profilePicURL: any = "";
  picType: any = "";
  isUndefined: any = "";
  isNOTUndefined: boolean = false;


  constructor(private apiService: ApiService, private sanitizer: DomSanitizer) {
    this.apiService.user()
      .subscribe(
        data => {
          this.extractInfo(data)
        }
      )

    // this.picType = this.apiService.type;
    // console.log(this.picType)
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
  // buildUrlTwitter: any = "";
  // buildUrlGithub: any = "";
  birthday: any = null;

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
    this.profilePicture = data.profilePicture;
    this.birthday = data.birthday;

    // console.log("aici" + this.apiService.type)
    // this.profilePicURL = 'data:' + this.apiService.type + ';base64,' + this.profilePicture;

    // console.log(this.profilePicture)
    if (this.profilePicture == undefined) {
      this.isUndefined = true;
    } else {
      this.isUndefined = false;
    }

    this.profilePicURL = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.profilePicture);
    // console.log(this.profilePicURL)

    // console.log(this.profilePicture) // ..\uploads\images\save-whatsapp-profile-picture-image3.jpg
    // console.log("here " + this.birthday)
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
