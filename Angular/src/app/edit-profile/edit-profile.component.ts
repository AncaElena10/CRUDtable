import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from '../../../node_modules/rxjs';
import { FilterPipe} from '../shared/filter.pipe';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  firstname: any = '';
  lastname: any = '';
  email: any = '';
  _id: any = '';
  bio: any = "";
  gender: any = "";
  hobby: any = "";
  location: any = "";
  twitterName: any = "";
  githubName: any = "";
  userLocation: any = "";

  showPersonalInfo: boolean = false;
  showBio: boolean = false;
  showEmail: boolean = false;
  showPassword: boolean = false;
  showDelete: boolean = false;
  showProfilePic: boolean = false;
  showOtherInfo: boolean = false;
  success: boolean = false;
  isSelectedProfilePic: boolean = false;
  blockDelete: boolean = false;

  selectedFile: File = null;
  rootURL = "http://localhost:3000/api";
  url = '';
  public editEnabled = true;
  public picurl: string;
  hobbyList = [
    'baking',
    'computer programming',
    'dancing',
    'drawing',
    'fashion',
    'graphics',
    'gaming',
    'video gaming',
    'driving',
    'cycling',
    'ice skating',
    'skateboarding',
    'photography',
    'music',
    'guitar playing'
  ]

  // google maps
  public title = 'Places';
  public addrKeys: string[];
  public addr: object;

  // selectedUser = {
  //   _id: "",
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   password: "",
  //   verify: "",
  // };

  // editForm: FormGroup = new FormGroup({
  //   firstname2: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
  //   lastname2: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
  //   email2: new FormControl(null, [Validators.email, Validators.required]),
  //   password2: new FormControl(null, Validators.required),
  //   verify2: new FormControl(null, Validators.required)
  // })

  // get firstname2() {
  //   return this.editForm.get('firstname2');
  // }

  // get lastname2() {
  //   return this.editForm.get('lastname2');
  // }

  // get email2() {
  //   return this.editForm.get('email2');
  // }

  // get password2() {
  //   return this.editForm.get('password2');
  // }

  // get verify2() {
  //   return this.editForm.get('verify2');
  // }

  constructor(private apiService: ApiService, private router: Router, private http: HttpClient, private zone: NgZone) {
    // this.apiService.refreshUser();
    this.apiService.user()
      .subscribe(
        data => {
          this.extractInfo(data)
          // console.log("edit profile ", data)
        }
      )
    // console.log(this.currentUser)
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }

  extractInfo(data) { // data - este un obiect
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this._id = data._id;
    this.bio = data.bio;
    this.location = data.location;
    // console.log(data.location)
    // data.location = this.userLocation;
    // this.location = data.location;
    // console.log("here: " + this.location)
    this.githubName = data.githubName;
    this.twitterName = data.twitterName;
    this.gender = data.gender;
    // this.hobby = data.hobby;
    // this.bio = data.bio;
    // localStorage.setItem('firstname', this.firstname);
    // console.log(this.firstname);

    // console.log("here" + this.location)
  }

  ngOnInit() {
    this.apiService.resetForm();
    this.apiService.refreshUser();
    // console.log(this.apiService.selectedUser)
  }

  onEditInfo(form: NgForm) {
    // // console.log("EDIT")
    // this.success = true;
    // // console.log(form.value)
    // this.apiService.putUser(form.value).subscribe((res) => {
    //   // console.log("form value user: " + JSON.stringify(form.value))
    //   this.apiService.refreshUser();
    // });

    // // console.log("EDIT PROFILE ", this.apiService.selectedUser)

    this.success = true;
    if (form.value._id != "") { // insert
      this.apiService.putUser(form.value).subscribe((res) => {
        // console.log("form value employee: " + JSON.stringify(form.value))
        // this.apiService.resetForm(form);
        this.apiService.refreshUser();
        // M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }

    // console.log(this.apiService.selectedUser)
  }

  // onEditEmail(event) {
  //   console.log(event);
  // }

  onDelete(_id: string) {
    if (confirm('Are you sure you want to permanently delete this account?') == true) {
      this.apiService.deleteUser(_id).subscribe((res) => {
        // this.apiService.refreshUser();

      });
      this.apiService.setLoggedIn(false);
    }
  }

  public clear() {
    this.picurl = '';
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];

    console.log(this.selectedFile)
    // if (event.target.files && event.target.files[0]) {
    //   var reader = new FileReader();

    //   reader.readAsDataURL(event.target.files[0]);

    //   reader.onload = (event) => {
    //     this.url = event.target.result;
    //   }

    // }
  }

  onUpload() {
    const fd = new FormData();
    fd.append('profilePicture', this.selectedFile, this.selectedFile.name);

    // console.log("here", this.selectedFile.name)
    // console.log("there", fd)

    this.http.post(this.rootURL + '/upload', fd)
      .subscribe(res => {
        console.log(res);
      });
    this.isSelectedProfilePic = true;
  }

  deleteChecked(event) {
    if (event.target.checked) {
      this.blockDelete = true;
    } else {
      this.blockDelete = false;
    }
  }

  // editForm: FormGroup = new FormGroup({
  //   bio: new FormControl(null, ),
  //   gender: new FormControl(null, ),
  //   hobby: new FormControl(null, ),
  // });

  // edit() {
  //   if (!this.editForm.valid) {
  //     console.log('Invalid Form'); return;
  //   }

  //   this.apiService.userEdit(JSON.stringify(this.editForm.value))
  //     .subscribe(
  //       data => { console.log(data); this.router.navigate(['/profile']); },
  //       error => console.error(error)
  //     )
  // }

  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
      this.userLocation = this.addr['formatted_address'];

      // console.log(this.userLocation)
      // console.log("addr: " + addrObj)

    });
    // this.location = this.userLocation;
  }

  saveUserHobby(event: any) {
    // console.log(event)
    // console.log("heellllooo")

    // valoarea aleasa din lista
    // console.log(event.target.firstChild['data'])
    // console.log(event.target.innerText)

    // this.hobby = event.target.innerText;
  }

  personalInfo() {
    this.showPersonalInfo = true;
    this.showBio = false;
    this.showEmail = false;
    this.showPassword = false;
    this.showDelete = false;
    this.showProfilePic = false;
    this.showOtherInfo = false;
    this.success = false;
    // console.log(this.showPersonalInfo)
  }

  changeBio() {
    this.showBio = true;
    this.showPersonalInfo = false;
    this.showEmail = false;
    this.showPassword = false;
    this.showDelete = false;
    this.showProfilePic = false;
    this.showOtherInfo = false;
    this.success = false;
  }

  changeEmail() {
    this.showEmail = true;
    this.showPersonalInfo = false;
    this.showBio = false;
    this.showPassword = false;
    this.showDelete = false;
    this.showProfilePic = false;
    this.showOtherInfo = false;
    this.success = false;
  }

  changePassword() {
    this.showPassword = true;
    this.showPersonalInfo = false;
    this.showBio = false;
    this.showEmail = false;
    this.showDelete = false;
    this.showProfilePic = false;
    this.showOtherInfo = false;
    this.success = false;
  }

  deleteUser() {
    this.showDelete = true;
    this.showPassword = false;
    this.showPersonalInfo = false;
    this.showBio = false;
    this.showEmail = false;
    this.showProfilePic = false;
    this.showOtherInfo = false;
    this.success = false;
  }

  changeProfilePicture() {
    this.showProfilePic = true;
    this.showDelete = false;
    this.showPassword = false;
    this.showPersonalInfo = false;
    this.showBio = false;
    this.showEmail = false;
    this.showOtherInfo = false;
    this.success = false;
  }

  changeOtherInfo() {
    this.showOtherInfo = true;
    this.showProfilePic = false;
    this.showDelete = false;
    this.showPassword = false;
    this.showPersonalInfo = false;
    this.showBio = false;
    this.showEmail = false;
    this.success = false;
  }
}
