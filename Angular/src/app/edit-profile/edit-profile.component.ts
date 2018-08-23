import { Component, OnInit, NgZone, VERSION, ViewChild } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from '../../../node_modules/rxjs';
import { FilterPipe } from '../shared/filter.pipe';
import { DateTimePickerComponent } from '../date-time-picker/date-time-picker.component';
import * as types from 'gijgo';
import { TemplateDefinitionBuilder } from '@angular/compiler/src/render3/view/template';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';

// declare global {
//   interface FormData {
//     entries(): Iterator<[USVString, USVString | Blob]>;
//   }
// }

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

  datepicker: DateTimePickerComponent;
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
  rootURL = "http://localhost:3000/api";
  url = '';
  public editEnabled = true;
  public picurl: string;
  selectedHobby: any = [];

  fd: any;

  fileToUpload: File = null;
  imageUrl: string = "https://pbs.twimg.com/media/C8QlKN7V0AA3zlG.jpg";

  hobbyList = [];
  selectedHobbyItems = [];
  hobbySettings = {};

  // google maps
  public title = 'Places';
  public addrKeys: string[];
  public addr: object;
  public newDate: any = "";

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

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, private http: HttpClient, private zone: NgZone) {
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
    // this.apiService.userPic()
    // .subscribe(
    //   data => {
    //     // this.extractInfo(data)
    //     console.log("edit profile ", data)
    //   }
    // )

    // autocomplete hobby
    // this.initForm();
    // this.configuration = {
    //   value: this.date,
    //   // uiLibrary: 'bootstrap4',
    //   // width: 200,
    //   open: (e) => {
    //     // this.eventLog += 'Open is fired.';
    //   },
    //   close: (e) => {
    //     // this.eventLog += 'Close is fired.';
    //   },
    //   change: (e) => {
    //     this.date = this.datepicker.instance.value().toString();
    //     // this.eventLog += 'Change is fired. ';
    //   }
    // };

  }

  // setValue() {
  //   this.datepicker.instance.value('03/12/2018');
  // }

  // setValueForLocation() {
  //   this.location.instance.value(this.userLocation);
  // }

  // autocomplete hobby
  // initForm(): FormGroup {
  //   return this.hobbyForm = this.fb.group({
  //     hobby: [null] // searchForHobby = formControlName
  //   });
  // }

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
    this.profilePicture = data.profilePicture;
    this.birthday = data.birthday;
    this.publicBirthday = data.publicBirthday;
    this.phoneNumber = data.phoneNumber;
    this.facebookName = data.facebookName;
    this.youtubeName = data.youtubeName;

    // this.newDate = JSON.stringify(data.birthday);
    // this.birthday = this.newDate.split('T')[0];

    // console.log(this.profilePicture) // ..\uploads\images\save-whatsapp-profile-picture-image3.jpg

    // this.hobby = data.hobby;
    // this.bio = data.bio;
    // localStorage.setItem('firstname', this.firstname);
    // console.log(this.birthday);

    // console.log("here" + this.location)
  }

  ngOnInit() {
    this.apiService.resetForm();
    this.apiService.refreshUser();
    // console.log(this.apiService.selectedUser)

    this.hobbyList = [
      // { item_id: 1, item_text: 'baking' },
      // { item_id: 2, item_text: 'computer programming' },
      // { item_id: 3, item_text: 'dancing' },
      // { item_id: 4, item_text: 'drawing' },
      // { item_id: 5, item_text: 'New fashion' },
      // { item_id: 6, item_text: 'graphics' },
      // { item_id: 7, item_text: 'gaming' },
      // { item_id: 8, item_text: 'video gaming' },
      // { item_id: 9, item_text: 'driving' },
      // { item_id: 10, item_text: 'cycling' },
      // { item_id: 11, item_text: 'ice skating' },
      // { item_id: 12, item_text: 'skateboarding' },
      // { item_id: 13, item_text: 'photography' },
      // { item_id: 14, item_text: 'music' },
      // { item_id: 15, item_text: 'guitar playing' }
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
    // this.selectedHobbyItems = [
    //   {  item_text: 'baking' }
    // ]
    this.hobbySettings = {
      singleSelection: false,
      idField: 'id',
      // textField: 'item_text',
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
    // // console.log("EDIT")
    // this.success = true;
    // console.log(form.value)
    // this.apiService.putUser(form.value).subscribe((res) => {
    //   // console.log("form value user: " + JSON.stringify(form.value))
    //   this.apiService.refreshUser();
    // });

    // // console.log("EDIT PROFILE ", this.apiService.selectedUser)

    this.success = true;

    if (form.value._id != "") { // insert
      this.apiService.putUser(form.value)
        .subscribe((res) => {
          // console.log("form value employee: " + JSON.stringify(form.value))
          // this.apiService.resetForm(form);
          this.apiService.refreshUser();
          // M.toast({ html: 'Updated successfully', classes: 'rounded' });
        });
    }

    // console.log(this.apiService.selectedUser)
  }

  onUpload(form: NgForm, _id) {
    const fd = new FormData();

    fd.append('profilePicture', this.fileToUpload, this.fileToUpload.name);

    // adaugata ulterior
    fd.append('_id', form.value._id)

    // this.apiService.type = this.fileToUpload.type; // "image/tip_poza"

    this.success = true;

    // console.log("print aici" + this.apiService.type)

    // console.log(this.fileToUpload)
    // console.log(_id)
    // fd.append(form.value._id, this.fileToUpload, this.fileToUpload.name)

    // console.log("form value pic update " + form.value._id )

    // console.log(this.fileToUpload)
    // console.log(this.fileToUpload.name)

    // console.log("here", fd.get('_id'))

    // for (var pair of fd.entries()) {
    //   console.log(pair[0]);
    // }

    // console.log(fd)

    // metoda 1
    // this.http.post(this.rootURL + '/upload', fd)
    //   .subscribe(res => {
    //   });

    // metoda 2
    this.apiService
      .uploadPicture(fd)
      .subscribe(
        res => {
          // response => { // download file
          //   var blob = new Blob([response.blob()], { type: 'application/pdf' });
          //   var filename = 'file.pdf';
          //   saveAs(blob, filename);
          // this.apiService.resetForm(form);
          this.apiService.refreshUser();
        },
      );
    this.isSelectedProfilePic = true;
    // console.log(this.profilePicture)
  }

  // onEditEmail(event) {
  //   console.log(event);
  // }

  onDelete(_id: string) {
    if (confirm('Are you sure you want to permanently delete this account?') == true) {
      this.apiService.deleteUser(_id).subscribe((res) => {
        // this.apiService.refreshUser();
        // this.apiService.resetForm();
      });
      this.apiService.setLoggedIn(false);
      this.router.navigateByUrl('/employees');
    }
  }

  public clear() {
    this.picurl = '';
  }

  // onFileSelected(event) {
  // this.selectedFile = <File>event.target.files[0];

  // console.log(this.selectedFile)
  // if (event.target.files && event.target.files[0]) {
  //   var reader = new FileReader();

  //   reader.readAsDataURL(event.target.files[0]);

  //   reader.onload = (event) => {
  //     this.url = event.target.result;
  //   }

  // }
  // }

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
      // console.log("addr: " + JSON.stringify(addrObj))

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

    // console.log("here: " + event)
    // this.selectedHobby = event.target.innerText;
    this.selectedHobby = event;
  }

  handleFileInput(file: FileList) {
    // console.log("id", _id)
    this.fileToUpload = file.item(0);
    // console.log(this.fileToUpload.name)

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);

    // console.log("here ", this.fileToUpload)
  }

  // TODO - trebuie sa trimit cumva id-ul la node

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
