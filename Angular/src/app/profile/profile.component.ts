import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userhome',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  firstname: any = '';
  // isLogged = false;

  constructor(private apiService: ApiService, private router: Router) {
    this.apiService.user()
      .subscribe(
        data => this.addName(data),
        error => this.router.navigate(['/employees']) // aici refirectez in cazul in care acceseaza /profile dar nu este logat
      )
  }

  addName(data) { // data - este un obiect
    // console.log(data)
    this.firstname = data.firstname;
    // localStorage.setItem('firstname', this.firstname);
    // console.log(this.firstname);
  }

  ngOnInit() {

  }
}