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

  buildUrlTwitter: any = "";
  buildUrlGithub: any = "";
  messageSengMsg: boolean = false;
  isSubmitted: boolean = false;

  adminFirstname = "Anca";
  adminLastname = "Moisa";
  adminLocation = "Strada Solstițiului, Popești-Leordeni 077160, România";
  adminPhone = "(+40) 749 153 648";
  adminEmail = "moisa.anca10@gmail.com";
  adminGithub = "AncaElena10";
  adminTwitter = "anca_moisa";

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
    this.updateLatLngFromAddress();
    // this.apiService.user()
    //   .subscribe(
    //     data => {
    //       this.extractInfo(data)
    //       // console.log("edit profile ", data)
    //     }
    //   )
  }

  extractInfo(data) { // data - este un obiect
    // this.addressToDisplay = data.location;
    this.updateLatLngFromAddress();
  }

  updateLatLngFromAddress() {
    // console.log(this.addressToDisplay)
    this.apiService
      .findFromAddress(this.adminLocation)
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
        this.zoom = 13;
      });
    }
  }

  ngOnInit() {
    document.body.classList.remove('bg-img-login');
    // document.body.classList.remove('bg-img-home');
    // document.body.classList.remove('bg-img-profile');
    // document.body.classList.remove('bg-img-comment-section');
    document.body.classList.remove('bg-img-register');
    // document.body.classList.add('bg-img-contact');
    this.setCurrentPosition();
  }

  goToGitUrl() {
    // console.log("here" + this.apiService.selectedUser['githubName'])
    this.buildUrlGithub = "https://github.com/" + this.adminGithub
    window.location.href = this.buildUrlGithub;
  }

  goToTwitterUrl() {
    this.buildUrlTwitter = "https://twitter.com/" + this.adminTwitter;
    window.location.href = this.buildUrlTwitter;
  }

  goToFacebookUrl() {
    window.location.href = "https://www.facebook.com";
  }

  goToYoutubeUrl() {
    window.location.href = "https://www.youtube.com/channel/UCgOMsJs1DKfemuPGqCqAJDw?view_as=subscriber"
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
