import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input("selectedObj") selectedObj;
  constructor(public employeeService: EmployeeService) { }
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

  }

  onSubmit(form: NgForm) {
    console.log("MODAL ", this.employeeService.employees)
    if (form.value._id == "") {
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        this.employeeService.refreshEmployeeList();
      });
    } else {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        this.employeeService.refreshEmployeeList();
      });
    }
  }
}