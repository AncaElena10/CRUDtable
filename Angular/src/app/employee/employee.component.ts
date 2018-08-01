import { Component, OnInit, PipeTransform } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { NgForm } from '@angular/forms';
import { Router } from '../../../node_modules/@angular/router';
import { ApiService } from '../shared/api.service';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService],
})
export class EmployeeComponent implements OnInit {

  sortedCollection: any[];
  order: string = 'name';
  reverse: boolean = false;
  // ename = [];
  // eposition = [];
  // eoffice = [];
  // eparams = [];

  constructor(
    private employeeService: EmployeeService, private router: Router, private apiService: ApiService) {
    // this.employeeService.employee()
    //   .subscribe( // data contine toate datele bagate in tabel
    //     data => this.addParameters(data),
    //     error => this.router.navigate(['/employees']) // aici refirectez in cazul in care acceseaza /profile dar nu este logat
    //   )
  }

  // addParameters(data) { // data este un array
  //   // console.log(data);
  //   // this.ename = data.name;
  //   // this.position = data.position;
  //   // this.office = data.office;

  //   // localStorage.setItem('firstname', this.firstname);
  //   var i;
  //   // for (dataObj in data) {
  //   //   this.ename = dataObj.name;
  //   //   this.eposition = dataObj.position;
  //   //   this.eoffice = dataObj.office;
  //   //   console.log(this.ename);
  //   // }
  //   for (i = 0; i < data.length; i++) {
  //     this.ename.push(data[i].name);
  //     this.eposition.push(data[i].position);
  //     this.eoffice.push(data[i].office);
  //   }
  //   this.eparams.push(this.ename, this.eposition, this.eoffice);
  //   // console.log(this.eparams);
  //   // console.log(this.ename)
  //   // this.eparams[0].map(function (_, c) { return this.eparams.map(function (r) { return r[c]; }); });
  //   this.eparams = this.transpose(this.eparams);

  //   // console.log(this.eparams)
  // }

  // transpose(a) {
  //   return Object.keys(a[0]).map(function (c) {
  //     return a.map(function (r) { return r[c]; });
  //   });
  // }

  selectedEmployee = {
    _id: "",
    name: "",
    position: "",
    office: "",
    salary: null
  };

  ngOnInit() {
    this.employeeService.resetForm();
    this.employeeService.refreshEmployeeList();
    // console.log(this.apiService.getLoggedIn());
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
    this.selectedEmployee = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.employeeService.refreshEmployeeList();
        this.employeeService.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
}
