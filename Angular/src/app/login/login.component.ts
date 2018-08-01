import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CookieService]
})
export class LoginComponent implements OnInit {

  Formdata: any = [];

  loginForm: FormGroup = new FormGroup({
    password: new FormControl(null, Validators.required),
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    remember: new FormControl(null, null)
  });
  constructor(private router: Router, private apiService: ApiService, private _cookieService: CookieService) {
    // remember me
    if (_cookieService.get('uremember')) {
      this.Formdata.uemail = this._cookieService.get('uemail');
      this.Formdata.upassword = this._cookieService.get('upassword');
      this.Formdata.uremember = this._cookieService.get('uremember');
    }
  }

  ngOnInit() {
  }

  rememberMe() {
    // remember me
    this._cookieService.set('uemail', this.Formdata.uemail);
    this._cookieService.set('upassword', this.Formdata.upassword);
    this._cookieService.set('uremember', this.Formdata.uremember);
  }

  login() {
    // check if logged in - localStorage
    this.apiService.setLoggedIn(true);
    this.apiService.loginMessage = true;

    if (!this.loginForm.valid) {
      console.log('Invalid'); return;
    }

    this.apiService.userLogin(JSON.stringify(this.loginForm.value))
      .subscribe(
        data => { console.log(data); this.router.navigate(['/profile']); },
        error => console.error(error)
      )
  }
}