import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { NgForm } from '../../../node_modules/@angular/forms';
import {ResponseContentType } from '@angular/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  rootURL = "http://localhost:3000/api";
  userURL = "http://localhost:3000/users"
  msg: string = null;
  // isLogged: boolean = false;
  // messageSuccess: boolean = false;
  loginMessage: boolean = false;
  selectedUser: User;
  type: any = "";
  // publicBirthday: boolean = false;

  constructor(private http: HttpClient) { }

  userRegister(body: any) {
    return this.http.post(this.rootURL + '/register', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  // userEdit(body: any) {
  //   return this.http.post(this.userURL + '/edit', body, {
  //     observe: 'body',
  //     headers: new HttpHeaders().append('Content-Type', 'application/json')
  //   });
  // }

  userLogin(body: any) {
    return this.http.post(this.rootURL + '/login', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }).toPromise().then((x) => {
      this.setLoggedIn(true);
    });
  }

  user() {
    return this.http.get(this.rootURL + '/profile', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  logout() {
    return this.http.get(this.rootURL + '/logout', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  sendEmail(body: any) {
    return this.http.post(this.rootURL + '/send', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');
  // private loggedInStatus = false

  // private loggedInStatus = localStorage.getItem('loggedIn')

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    // console.log("here " + this.loggedInStatus)
    localStorage.setItem("loggedIn", this.loggedInStatus);
  }

  getLoggedIn() {
    // return this.loggedInStatus;
    // console.log(JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString()))
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
    // return localStorage.getItem('loggedIn')
  }

  // get isLoggedIn() {
  //   return this.loggedInStatus
  // }

  uploadPicture(body: any) {
    // console.log(this.type)
    return this.http.post(this.rootURL + '/upload', body, {
      // observe: 'body', 
      // observe: 'response',
      responseType: 'blob',
      // headers: new HttpHeaders().append('Content-Type', 'application/form-data'),
    });
  }

  userPic() {
    return this.http.get(this.rootURL + '/upload', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  putUser(user: User) {
    // console.log
    // console.log("id user: ", user._id)
    return this.http.put(this.rootURL + `/${user._id}`, user);
  }

  // getUser() {
  //   return this.http.get(this.rootURL + "/profile");
  // }

  deleteUser(_id: string) {
    return this.http.delete(this.rootURL + `/${_id}`);
  }

  refreshUser() {
    // console.log("print in user " + JSON.stringify(this.getUser()))
    this.user().subscribe((res) => {
      this.selectedUser = res as User;

    });
    // console.log(this.selectedUser)
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.selectedUser = {
      _id: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      verify: "",
      gender: "",
      location: "",
      twitterName: "",
      githubName: "",
      facebookName: "",
      youtubeName: "",
      hobby: "",
      bio: "",
      profilePicture: null,
      birthday: null,
      publicBirthday: false,
      phoneNumber: 0,
    }
  }
}
