import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { User } from './user.model';
import { NgForm } from '../../../node_modules/@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  msg: string = null;
  loginMessage: boolean = false;
  selectedUser: User;
  type: any = "";
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  API_KEY: string;
  API_URL: string;

  constructor(private http: HttpClient) {

    this.API_KEY = 'AIzaSyB3a71eakX1ji_aFPmQpGf5gWD278RRl4o'
    this.API_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${this.API_KEY}&address=`;

  }

  findFromAddress(address: string): Observable<any> {
    let compositeAddress = [address];

    let url = `${this.API_URL}${compositeAddress.join(',')}`;

    return this.http.get(url)
      .pipe(map(response => <any>response));
  }

  userRegister(body: any) {
    return this.http.post(environment.rootURL + '/api/register', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  userLogin(body: any) {
    return this.http.post(environment.rootURL + '/api/login', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }).toPromise().then((x) => {
      this.setLoggedIn(true);
    });
  }

  user() {
    return this.http.get(environment.rootURL + '/api/profile', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  logout() {
    return this.http.get(environment.rootURL + '/api/logout', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  sendEmail(body: any) {
    return this.http.post(environment.rootURL + '/api/send', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem("loggedIn", this.loggedInStatus);
  }

  getLoggedIn() {
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }

  uploadPicture(body: any) {
    return this.http.post(environment.rootURL + '/api/upload', body, {
      responseType: 'blob',
    });
  }

  userPic() {
    return this.http.get(environment.rootURL + '/api/upload', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  putUser(user: User) {
    return this.http.put(environment.rootURL + `/api/${user._id}`, user);
  }

  deleteUser(_id: string) {
    return this.http.delete(environment.rootURL + `/api/${_id}`);
  }

  refreshUser() {
    this.user().subscribe((res) => {
      this.selectedUser = res as User;

    });
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
