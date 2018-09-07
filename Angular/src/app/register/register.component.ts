import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isSubmitted: boolean = false;
  bkreg

  registerForm: FormGroup = new FormGroup({
    firstname: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
    lastname: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required),
    verify: new FormControl(null, Validators.required),
    bio: new FormControl(null),
    gender: new FormControl(null),
    hobby: new FormControl(null),
    location: new FormControl(null),
    twitterName: new FormControl(null),
    githubName: new FormControl(null),
    profilePicture: new FormControl(null),
    birthday: new FormControl(null),
    phoneNumber: new FormControl(null),
  })
  constructor(private router: Router, private apiService: ApiService) { }

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

  register() {
    if (!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.verify.value)) {
      console.log('Invalid Form'); return;
    }

    this.apiService.userRegister(JSON.stringify(this.registerForm.value))
      .subscribe(
        data => { console.log(data); this.router.navigate(['/login']); },
        error => console.error(error)
      )
    this.isSubmitted = true;
  }

  reset() {
    this.isSubmitted = false;
    this.registerForm.reset();
  }
}