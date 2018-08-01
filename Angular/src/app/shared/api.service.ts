import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem("loggedIn", 'true');
  }
 
  getLoggedIn() {
    // return this.loggedInStatus;
    // console.log(JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString()))
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }

  // get isLoggedIn() {
  //   return this.loggedInStatus
  // }
}
