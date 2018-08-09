import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  rootURL = "http://localhost:3000/api";
  msg: string = null;
  // isLogged: boolean = false;
  // messageSuccess: boolean = false;
  loginMessage: boolean = false;

  constructor(private http: HttpClient) { }

  userRegister(body: any) {
    return this.http.post(this.rootURL + '/register', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

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
    return this.http.post(this.rootURL + '/upload', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
