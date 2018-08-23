import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { NgModule } from '@angular/core';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { NguiMapModule } from '@ngui/map';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MapsAPILoader } from '@agm/core';
// import {} from '@types/googlemaps';
import { ViewChild, ElementRef, NgZone, } from '@angular/core'

declare var ol: any;

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css'],
  providers: [GoogleMapsAPIWrapper],
})

export class ContactMeComponent implements OnInit {

  firstname: any = "";
  buildUrlTwitter: any = "";
  buildUrlGithub: any = "";
  messageSengMsg: boolean = false;
  isSubmitted: boolean = false;

  addressToDisplay: any = "";
  lat: number
  lng: number

  sendForm: FormGroup = new FormGroup({
    nameSender: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
    emailSender: new FormControl(null, [Validators.email, Validators.required]),
    phoneSender: new FormControl(null),
    messageSender: new FormControl(null, [Validators.required]),
    emailReceiver: new FormControl(null)
  })


  get nameSender() {
    return this.sendForm.get('nameSender');
  }

  get emailSender() {
    return this.sendForm.get('emailSender');
  }

  get phoneSender() {
    return this.sendForm.get('phoneSender');
  }

  get messageSender() {
    return this.sendForm.get('messageSender');
  }

  constructor(private apiService: ApiService) {
    this.apiService.user()
      .subscribe(
        data => {
          this.extractInfo(data)
          // console.log("edit profile ", data)
        }
      )
  }

  extractInfo(data) { // data - este un obiect
    this.addressToDisplay = data.location;
    this.updateLatLngFromAddress();
  }

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

  ngOnInit() {
    this.apiService.resetForm();
    this.apiService.refreshUser();
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

  send() {
    console.log(this.sendForm.value)
    if (!this.sendForm.valid) {
      console.log('Invalid Form'); return;
    }
    this.messageSengMsg = true;
    this.sendForm.value['emailReceiver'] = this.apiService.selectedUser.email;

    this.apiService.sendEmail(JSON.stringify(this.sendForm.value))
      .subscribe(
        data => { console.log("Message sent! " + data); this.messageSengMsg = true; },
        error => { console.error(error); this.messageSengMsg = false; }
      )

    this.isSubmitted = true;
  }
}
