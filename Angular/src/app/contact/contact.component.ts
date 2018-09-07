import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
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

  constructor(public apiService: ApiService) {
    this.apiService.user()
      .subscribe(
        data => {
          this.extractInfo(data)
        }
      )
  }

  location: any = "";
  birthday: any = null;

  extractInfo(data) {
    this.location = data.location;
    this.birthday = data.birthday;
    this.addressToDisplay = data.location;
    this.updateLatLngFromAddress();
  }

  ngOnInit() {
    this.apiService.resetForm();
    this.apiService.refreshUser();
    this.setCurrentPosition();
  }

  updateLatLngFromAddress() {
    this.apiService
      .findFromAddress(this.addressToDisplay)
      .subscribe(response => {
        if (response.status == 'OK') {
          this.lat = response.results[0].geometry.location.lat;
          this.lng = response.results[0].geometry.location.lng;
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
