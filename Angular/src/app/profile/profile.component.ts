import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-userhome',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  firstname: any = '';
  // isLogged = false;
  profileAccess: boolean = true;
  currentUser: User;

  constructor(private apiService: ApiService, private router: Router, private http: HttpClient) {
    this.apiService.user()
      .subscribe(
        data => { this.profileAccess = true, this.addName(data), console.log("data ", data) },
        error => { this.profileAccess = false, console.log("Please login to have access at your profile.") } // aici refirectez in cazul in care acceseaza /profile dar nu este logat
      )

    // console.log(this.currentUser)
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  addName(data) { // data - este un obiect
    // console.log(data)
    this.firstname = data.firstname;
    // localStorage.setItem('firstname', this.firstname);
    // console.log(this.firstname);
  }

  ngOnInit() {
    document.body.classList.remove('bg-img-login');
    document.body.classList.remove('bg-img-register');
    document.body.classList.remove('bg-img-home');
  }

  public editEnabled = true;
  public picurl: string;

  public clear() {
    this.picurl = '';
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.url = event.target.result;
      }

    }
  }

  selectedFile: File = null;
  rootURL = "http://localhost:3000/api";
  url = '';

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);

    this.http.post(this.rootURL + '/upload', fd)
      .subscribe(res => {
        console.log(res);
      });
  }
}