import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Router, NavigationStart } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged: boolean;
  searchBar: boolean = false;

  selectedEmployee = {
    _id: "",
    name: "",
    position: "",
    office: "",
    salary: null
  };

  constructor(public apiService: ApiService, private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/employees') {
          this.searchBar = true;
        } else {
          this.searchBar = false;
        }
      }
    });
  }

  ngOnInit() {
  }

  logout() {
    this.apiService.setLoggedIn(false);

    this.apiService.logout()
      .subscribe(
        data => { console.log(data); this.router.navigate(['/employees']) },
        error => console.error(error)
      )
    localStorage.removeItem('loggedIn');
  }
}