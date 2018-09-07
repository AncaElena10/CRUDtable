import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-userhome',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  firstname: any = '';

  constructor(public apiService: ApiService, private router: Router, private http: HttpClient) {
    if (!apiService.getLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/profile']);
    }
  }

  ngOnInit() {
    document.body.classList.remove('bg-img-login');
    document.body.classList.remove('bg-img-register');
  }
}