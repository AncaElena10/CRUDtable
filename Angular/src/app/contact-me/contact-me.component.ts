import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  public adminFirstname = "Anca";
  public adminLastname = "Moisa";
  public adminLocation = "Strada Solstițiului, Popești-Leordeni 077160, România";
  public adminPhone = "(+40) 749 153 648";
  public adminEmail = "moisa.anca10@gmail.com";
  public adminGithub = "AncaElena10";
  public adminTwitter = "anca_moisa";
  public adminFacebook = "www.facebook.com";
  public adminYoutube = "www.youtube.com;"
  public location;

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

  constructor(public apiService: ApiService) {
    this.updateLatLngFromAddress();
  }

  extractInfo(data) {
    this.updateLatLngFromAddress();
  }

  updateLatLngFromAddress() {
    this.apiService
      .findFromAddress(this.adminLocation)
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
        this.zoom = 13;
      });
    }
  }

  ngOnInit() {
    document.body.classList.remove('bg-img-login');
    document.body.classList.remove('bg-img-register');
    this.setCurrentPosition();
  }

  goToGitUrl() {
    this.buildUrlGithub = "https://github.com/" + this.adminGithub
    window.location.href = this.buildUrlGithub;
  }

  goToTwitterUrl() {
    this.buildUrlTwitter = "https://twitter.com/" + this.adminTwitter;
    window.location.href = this.buildUrlTwitter;
  }

  goToFacebookUrl() {
    window.location.href = this.adminFacebook;
  }

  goToYoutubeUrl() {
    window.location.href = this.adminYoutube;
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
