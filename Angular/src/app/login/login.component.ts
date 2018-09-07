import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  Formdata: any = [];
  loginErrorMessage: any = "";
  loading = false;
  loginUserData: {}
  loginForm: FormGroup;

  constructor(private router: Router, private apiService: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    document.body.classList.remove('bg-img-register');
    document.body.classList.add('bg-img-login');

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    if (!this.loginForm.valid) {
      this.apiService.setLoggedIn(false);
      this.apiService.loginMessage = false;
      console.log('Invalid');
      return;
    }

    this.apiService.userLogin(JSON.stringify(this.loginForm.value))
      .then(
        data => { this.router.navigate(['/profile']); },
        error => { this.loginErrorMessage = error.error.message, console.error(error) }
      )
  }
}