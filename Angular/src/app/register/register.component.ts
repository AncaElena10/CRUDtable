import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnChanges {

  isSubmitted: boolean = false;
  bkreg

  registerForm: FormGroup = new FormGroup({
    firstname: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
    lastname: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required),
    verify: new FormControl(null, Validators.required)
  })
  constructor(private router: Router, private apiService: ApiService) { }

  // sa pot accesa firstname.invalid ... etc
  get firstname() {
    return this.registerForm.get('firstname');
  }

  get lastname() {
    return this.registerForm.get('lastname');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get verify() {
    return this.registerForm.get('verify');
  }

  ngOnInit() {
    document.body.classList.remove('bg-img-login');
    document.body.classList.add('bg-img-register');
  }

  ngOnChanges() {
    // delete this.bkreg;
    // document.body.classList.add('bg-img-login');
  }

  register() {
    if (!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.verify.value)) {
      console.log('Invalid Form'); return;
    }

    this.apiService.userRegister(JSON.stringify(this.registerForm.value))
      .subscribe(
        data => { console.log(data); this.router.navigate(['/login'], { skipLocationChange: true }); }, // chiar daca ma duce catre login, nu mai apare in url /login
        error => console.error(error)
      )
    // console.log(JSON.stringify(this.registerForm.value));
    this.isSubmitted = true;
  }

  reset() {
    this.isSubmitted = false;
    this.registerForm.reset();
  }
}