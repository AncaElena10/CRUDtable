import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { first } from '../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnChanges {

  Formdata: any = [];
  loginErrorMessage: any = "";
  loading = false;
  loginUserData: {}
  loginForm: FormGroup;

  // loginForm: FormGroup = new FormGroup({
  //   password: new FormControl(null, Validators.required),
  //   email: new FormControl('', Validators.compose([
  //     Validators.required,
  //     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  //   ])),
  //   // remember: new FormControl(null, null)
  // });
  constructor(private router: Router, private apiService: ApiService, private formBuilder: FormBuilder) {
    // remember me
    // if (_cookieService.get('uremember')) {
    //   this.Formdata.uemail = this._cookieService.get('uemail');
    //   this.Formdata.upassword = this._cookieService.get('upassword');
    //   this.Formdata.uremember = this._cookieService.get('uremember');
    // }
  }

  ngOnInit() {
    document.body.classList.remove('bg-img-register');
    document.body.classList.add('bg-img-login');

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  ngOnChanges() {
    // delete this.bkreg;
    // document.body.classList.add('bg-img-register');
  }

  // rememberMe() {
  //   // remember me
  //   this._cookieService.set('uemail', this.Formdata.uemail);
  //   this._cookieService.set('upassword', this.Formdata.upassword);
  //   this._cookieService.set('uremember', this.Formdata.uremember);
  // }

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

    // this.apiService.setLoggedIn(true);
    // this.apiService.loginMessage = true;

    this.apiService.userLogin(JSON.stringify(this.loginForm.value))
      .then(
        data => { this.router.navigate(['/profile']); },
        error => { this.loginErrorMessage = error.error.message, console.error(error) } // aici e eroarea cu invalid user/passwd
      )

    // console.log(this.apiService.getLoggedIn)

    // if (this.loginForm.invalid) {
    //   return;
    // }

    // // this.loading = true;
    // // this.apiService.userLogin(this.f.email.value, this.f.password.value)
    // //   // .pipe(first())
    // //   .subscribe(
    // //     data => {
    // //       this.router.navigate(['/profile']);
    // //     },
    // //     error => {
    // //       // this.alertService.error(error);
    // //       this.loading = false;
    // //     });

    // this.apiService.userLogin(JSON.stringify(this.loginForm.value)).then((x) => {

  }
}