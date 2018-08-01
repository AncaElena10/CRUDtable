import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';

// declare var M: any; // pt mesaje

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input("selectedObj") selectedObj;
  constructor(private employeeService: EmployeeService) { }
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
    // functia asta se leaga de /NodeJS/controllers/employeeController.js -> router.post
    // se creaza o functie in employee.service.ts -> postEmployee

    // daca _id este empty, se face insert
    // daca _id nu e empty, se face update
    if (form.value._id == "") { // insert
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        this.employeeService.resetForm(form);
        // functie de refresh - se da automat dupa submit
        this.employeeService.refreshEmployeeList();
        // M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    } else { // update -> PUT
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        this.employeeService.resetForm(form);
        this.employeeService.refreshEmployeeList();
        // M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }
}
