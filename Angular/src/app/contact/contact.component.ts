import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { DOCUMENT } from '@angular/common';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

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
  isUndefined: boolean = false;
  isNOTUndefined: boolean = false;

  addressToDisplay: any = "";
  lat: number
  lng: number

  buildUrlTwitter: any = "";
  buildUrlGithub: any = "";

  constructor(public apiService: ApiService, private sanitizer: DomSanitizer) {
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
  location: any = "";
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
    this.location = data.location;
    // this.githubName = data.githubName;
    // this.twitterName = data.twitterName;
    // this.gender = data.gender;
    // this.hobby = data.hobby;
    // this.profilePicture = data.profilePicture;
    this.birthday = data.birthday;

    // console.log("aici" + this.apiService.type)
    // this.profilePicURL = 'data:' + this.apiService.type + ';base64,' + this.profilePicture;

    // console.log(this.profilePicture)
    // if (this.profilePicture == null) {
    //   this.isUndefined = true;
    //   console.log("da" + this.profilePicture)
    // } else {
    //   this.isUndefined = false;
    //   console.log("nu"  + this.profilePicture)
    // }

    // this.profilePicURL = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.profilePicture);
    // console.log(this.profilePicURL)

    // console.log(this.profilePicture) // ..\uploads\images\save-whatsapp-profile-picture-image3.jpg
    // console.log("here " + this.birthday)

    this.addressToDisplay = data.location;
    this.updateLatLngFromAddress();
  }

  ngOnInit() {
    this.apiService.resetForm();
    this.apiService.refreshUser();
    this.setCurrentPosition();

    // console.log(typeof(this.apiService.selectedUser.hobby))
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

  updateLatLngFromAddress() {
    // console.log(this.addressToDisplay)
    this.apiService
      .findFromAddress(this.addressToDisplay)
      .subscribe(response => {
        // console.log("LATITUDE " + response.results[0].geometry.location.lat)
        if (response.status == 'OK') {
          this.lat = response.results[0].geometry.location.lat;
          this.lng = response.results[0].geometry.location.lng;

          // console.log("aici lat" + this.lat)
        } else if (response.status == 'ZERO_RESULTS') {
          console.log("eroare1")
          console.log('geocodingAPIService', 'ZERO_RESULTS', response.status);
        } else {
          console.log("eroare2")
          console.log('geocodingAPIService', 'Other error', response.status);
        }
      });
  }

  latitudeCrt: any = "";
  longitudeCrt: any = "";
  zoom: any = "";

  setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitudeCrt = position.coords.latitude;
        this.longitudeCrt = position.coords.longitude;
        this.zoom = 15;
      });
    }
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

  goToFacebookUrl() {
    window.location.href = this.apiService.selectedUser['facebookName'];
  }

  goToYoutubeUrl() {
    window.location.href = this.apiService.selectedUser['youtubeName'];
  }
}
