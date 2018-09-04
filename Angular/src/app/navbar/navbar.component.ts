import { Component, OnInit, OnChanges } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Router, NavigationEnd, NavigationStart, RoutesRecognized } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // isLoggedSession: boolean = false;
  isLogged: boolean;
  // logoutSession: boolean = false;
  searchBar: boolean = false;

  selectedEmployee = {
    _id: "",
    name: "",
    position: "",
    office: "",
    salary: null
  };

  constructor(public apiService: ApiService, private router: Router) {
    // detecteaza schimbarea de ruta
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        // console.log(event)
        if (event['url'] == '/employees') {
          // console.log("DA")
          this.searchBar = true;
        } else {
          // console.log("NU")
          this.searchBar = false;
        }
      }
    });
  }

  ngOnInit() {
    // localStorage.setItem("", this.isLoggedSession);
    // this.isLogged = this.apiService.getLoggedIn();
    // this.searchBar = !this.searchBar;
  }

  logout() {
    // console.log(this.isLogged)
    // if (confirm('Are you sure you want to logout?') == true) {
    // this.apiService.isLogged = false;
    this.apiService.setLoggedIn(false);

    this.apiService.logout()
      .subscribe(
        data => { console.log(data); this.router.navigate(['/employees']) },
        error => console.error(error)
      )
    // this.isLogged = false;
    // localStorage.clear();
    // this.logoutSession = true;
    // } else {
    // this.logoutSession = false;
    // }

    localStorage.removeItem('loggedIn');

    // localStorage.removeItem('currentUser');
  }

  // isUserLogged() {
  //   // this.isLogged = this.apiService.getLoggedIn();
  //   // console.log(this.isLogged);
  //   // return this.isLogged;
  //   return this.apiService.getLoggedIn();
  // }
}