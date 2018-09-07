import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { IImage } from 'ng-simple-slideshow';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {

  profileAccess: boolean = true;
  firstname: any = '';


  imageUrls: (string | IImage)[] = [
    { url: 'https://static1.squarespace.com/static/587f8644e6f2e13a9e781144/t/59073c79c534a5c0bcef22a9/1493646473985/AdobeStock_107056399.jpeg?format=1500w' },
    { url: 'http://www.isrisoft.com/images/contactform.jpg' }
  ];
  height: string = '400px';
  arrowSize: string = '30px';
  showArrows: boolean = true;
  disableSwiping: boolean = false;
  autoPlay: boolean = true;
  autoPlayInterval: number = 3333;
  stopAutoPlayOnSlide: boolean = false;
  debug: boolean = false;
  showDots: boolean = true;
  dotColor: string = '#FFF';
  lazyLoad: boolean = false;
  width: string = '100%';

  constructor(public apiService: ApiService) {
    this.apiService.user()
      .subscribe(
        data => { this.profileAccess = true, this.extractInfo(data) },
        error => { this.profileAccess = false, console.log("Please login to have access at your profile.") }
      )
  }

  extractInfo(data) {
  }

  ngOnInit() {
    document.body.classList.remove('bg-img-login');
    document.body.classList.remove('bg-img-register');

    this.apiService.resetForm();
    this.apiService.refreshUser();

    setTimeout(() => {
      this.imageUrls.push('https://images.pond5.com/top-view-businessman-sitting-office-footage-073318654_prevstill.jpeg');
    }, 2000);
  }

}
