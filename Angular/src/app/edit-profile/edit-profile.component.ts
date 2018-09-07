import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as types from 'gijgo';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

@NgModule({
  imports: [
    AgmCoreModule
  ]
})

export class EditProfileComponent implements OnInit {

  @ViewChild("datepicker")

  configuration: types.DatePickerSettings;
  date = '03/08/2018';

  eventLog: string = '';
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
  profilePicture: any = "";
  birthday: any = "";
  publicBirthday: boolean = false;
  phoneNumber: number = null;
  facebookName: any = "";
  youtubeName: any = "";

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
  showSocial: boolean = false;

  selectedFile: File = null;
  url = '';
  public editEnabled = true;
  public picurl: string;
  selectedHobby: any = [];
  successMsg
  messageClass

  fd: any;

  fileToUpload: File = null;
  imageUrl: string = "https://pbs.twimg.com/media/C8QlKN7V0AA3zlG.jpg";

  hobbyList = [];
  selectedHobbyItems = [];
  hobbySettings = {};

  public title = 'Places';
  public addrKeys: string[];
  public addr: object;
  public newDate: any = "";

  constructor(private apiService: ApiService, private router: Router, private zone: NgZone) {
    this.apiService.user()
      .subscribe(
        data => {
          this.extractInfo(data)
        }
      )
  }

  extractInfo(data) {
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this._id = data._id;
    this.bio = data.bio;
    this.location = data.location;
    this.githubName = data.githubName;
    this.twitterName = data.twitterName;
    this.gender = data.gender;
    this.profilePicture = data.profilePicture;
    this.birthday = data.birthday;
    this.publicBirthday = data.publicBirthday;
    this.phoneNumber = data.phoneNumber;
    this.facebookName = data.facebookName;
    this.youtubeName = data.youtubeName;
  }

  ngOnInit() {
    this.apiService.resetForm();
    this.apiService.refreshUser();

    this.hobbyList = [
      'C',
      'C++',
      'C#',
      'Haskell',
      'Java',
      'JavaScript',
      'LaTeX',
      'Octave',
      'Python',
      'PHP',
      'Prolog',
      'R',
      'Racket',
      'SQL',
      'Verilog',
      'VHDL'
    ]
    this.hobbySettings = {
      singleSelection: false,
      idField: 'id',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
      limitSelection: 3
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onEditInfo(form: NgForm) {
    this.success = true;

    if (form.value._id != "") {
      this.apiService.putUser(form.value)
        .subscribe((data) => {
          if (!data['success']) {
            this.messageClass = 'alert alert-danger';
            this.successMsg = data['message'];
            this.apiService.refreshUser();
          } else {
            this.messageClass = 'alert alert-success';
            this.successMsg = data['message'];
            setTimeout(() => {
              this.success = false;
              this.successMsg = false;
              this.apiService.refreshUser();
            }, 2000);
          }
        });
    }
  }

  onUpload(form: NgForm, _id) {
    const fd = new FormData();
    fd.append('profilePicture', this.fileToUpload, this.fileToUpload.name);

    // adaugata ulterior
    fd.append('_id', form.value._id)

    this.success = true;
    this.apiService
      .uploadPicture(fd)
      .subscribe(
        data => {
          if (typeof (data) != 'object') {
            this.messageClass = 'alert alert-danger';
            this.successMsg = "Please select a file."
            this.apiService.refreshUser();
          } else {
            this.messageClass = 'alert alert-success';
            this.successMsg = "Record successfully updated!"
            setTimeout(() => {
              this.success = false;
              this.successMsg = false;
              this.apiService.refreshUser();
            }, 2000);
          }
        },
      );
    this.isSelectedProfilePic = true;
  }

  onDelete(_id: string) {
    if (confirm('Are you sure you want to permanently delete this account?') == true) {
      this.apiService.deleteUser(_id).subscribe((res) => {
      });
      this.apiService.setLoggedIn(false);
      this.router.navigateByUrl('/employees');
    }
  }

  public clear() {
    this.picurl = '';
  }

  deleteChecked(event) {
    if (event.target.checked) {
      this.blockDelete = true;
    } else {
      this.blockDelete = false;
    }
  }

  showBirthdayOnProfile(event) {
    if (event.target.checked) {
      this.publicBirthday = true;
    } else {
      this.publicBirthday = false;
    }
  }

  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
      this.userLocation = this.addr['formatted_address'];
    });
  }

  saveUserHobby(event: any) {
    this.selectedHobby = event;
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
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
    this.showSocial = false;
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
    this.showSocial = false;
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
    this.showSocial = false;
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
    this.showSocial = false;
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
    this.showSocial = false;
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
    this.showSocial = false;
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
    this.showSocial = false;
  }

  changeSocial() {
    this.showSocial = true;
    this.showOtherInfo = false;
    this.showProfilePic = false;
    this.showDelete = false;
    this.showPassword = false;
    this.showPersonalInfo = false;
    this.showBio = false;
    this.showEmail = false;
    this.success = false;
  }
}
