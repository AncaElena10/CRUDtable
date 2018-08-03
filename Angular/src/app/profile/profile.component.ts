import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-userhome',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  firstname: any = '';
  // isLogged = false;
  profileAccess: boolean = true;
  currentUser: User;

  constructor(private apiService: ApiService, private router: Router) {
    this.apiService.user()
      .subscribe(
        data => { this.profileAccess = true, this.addName(data), console.log("data ", data) },
        error => { this.profileAccess = false, console.log("Please login to have access at your profile.") } // aici refirectez in cazul in care acceseaza /profile dar nu este logat
      )
    
    // console.log(this.currentUser)
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  addName(data) { // data - este un obiect
    // console.log(data)
    this.firstname = data.firstname;
    // localStorage.setItem('firstname', this.firstname);
    // console.log(this.firstname);
  }

  ngOnInit() {
    document.body.classList.remove('bg-img-login'); 
    document.body.classList.remove('bg-img-register');
  }
}