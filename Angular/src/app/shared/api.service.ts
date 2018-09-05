import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { User } from './user.model';
import { NgForm } from '../../../node_modules/@angular/forms';
import { ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  // rootURL = "http://localhost:3030/api";
  msg: string = null;
  // isLogged: boolean = false;
  // messageSuccess: boolean = false;
  loginMessage: boolean = false;
  selectedUser: User;
  type: any = "";
  // publicBirthday: boolean = false;

  API_KEY: string;
  API_URL: string;

  constructor(private http: HttpClient) {

    this.API_KEY = 'AIzaSyB3a71eakX1ji_aFPmQpGf5gWD278RRl4o'
    this.API_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${this.API_KEY}&address=`;

  }

  findFromAddress(address: string): Observable<any> {
    let compositeAddress = [address];

    // console.log("aici1 " + compositeAddress)

    // if (postalCode) compositeAddress.push(postalCode);
    // if (place) compositeAddress.push(place);
    // if (province) compositeAddress.push(province);
    // if (region) compositeAddress.push(region);

    // if (country) compositeAddress.push(country);

    // console.log("aici " + compositeAddress)

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

  // userEdit(body: any) {
  //   return this.http.post(this.userURL + '/edit', body, {
  //     observe: 'body',
  //     headers: new HttpHeaders().append('Content-Type', 'application/json')
  //   });
  // }

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
    return this.http.post(environment.rootURL + '/api/upload', body, {
      // observe: 'body', 
      // observe: 'response',
      responseType: 'blob',
      // headers: new HttpHeaders().append('Content-Type', 'application/form-data'),
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
    // console.log
    // console.log("id user: ", user._id)
    return this.http.put(environment.rootURL + `/api/${user._id}`, user);
  }

  // getUser() {
  //   return this.http.get(this.rootURL + "/profile");
  // }

  deleteUser(_id: string) {
    return this.http.delete(environment.rootURL + `/api/${_id}`);
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
