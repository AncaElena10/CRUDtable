import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profileAccess: boolean = true;
  firstname: any = '';

  constructor(private apiService: ApiService, private router: Router, private http: HttpClient) {
    this.apiService.user()
      .subscribe(
        data => { this.profileAccess = true, this.extractInfo(data) },
        error => { this.profileAccess = false, console.log("Please login to have access at your profile.") }
      )

    // console.log(this.currentUser)
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // console.log("here: " + apiService.selectedUser)
  }

  extractInfo(data) { // data - este un obiect
    // console.log(data)
    // this.firstname = data.firstname;
    // localStorage.setItem('firstname', this.firstname);
    // console.log(this.firstname);
  }

  ngOnInit() {
    document.body.classList.remove('bg-img-login');
    // document.body.classList.remove('bg-img-home');
    // document.body.classList.remove('bg-img-profile');
    // document.body.classList.remove('bg-img-contact');
    document.body.classList.remove('bg-img-register');
    // document.body.classList.add('bg-img-comment-section');
    
    this.apiService.resetForm();
    this.apiService.refreshUser();
  }

}
