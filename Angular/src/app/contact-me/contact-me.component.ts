import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { NguiMapModule } from '@ngui/map';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MapsAPILoader } from '@agm/core';
// import {} from '@types/googlemaps';
import { ViewChild, ElementRef, NgZone, } from '@angular/core'

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css']
})

// @NgModule({
//   imports: [
//     AgmCoreModule
//   ]
// })

export class ContactMeComponent implements OnInit {

  // ---------------------------------------------------------------------------

  lat: number = 39.742043;
  lng: number = -104.991531;

  // ---------------------------------------------------------------------------

  firstname: any = "";
  buildUrlTwitter: any = "";
  buildUrlGithub: any = "";
  messageSengMsg: boolean = false;
  isSubmitted: boolean = false;

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

  // latitude: number = 51.678418;
  // longitude: number = 7.809007;

  constructor(private apiService: ApiService, private router: Router, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
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

  // onMapClick(event) {
  //   console.log(event);
  // }

  // send(sendForm: NgForm) {
  //   // console.log(sendForm.value)
  //   this.messageSengMsg = true;
  //   this.apiService.sendEmail(JSON.stringify(sendForm.value))
  //     .subscribe(
  //       data => { console.log("Message sent! " + data); this.messageSengMsg = true; },
  //       error => { console.error(error); this.messageSengMsg = false; }
  //     )
  // }

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
