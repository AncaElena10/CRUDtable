import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { NgForm } from '@angular/forms';
import { Router } from '../../../node_modules/@angular/router';
import { ApiService } from '../shared/api.service';

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
  p

  constructor(
    public employeeService: EmployeeService, public apiService: ApiService) {
  }

  selectedEmployee = {
    _id: "",
    name: "",
    position: "",
    office: "",
    salary: null
  };

  ngOnInit() {
    document.body.classList.remove('bg-img-login');
    document.body.classList.remove('bg-img-register');

    this.employeeService.resetForm();
    this.employeeService.refreshEmployeeList();
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
