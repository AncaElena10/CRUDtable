import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  obj: any = {};
  term;

  constructor(
    public employeeService: EmployeeService) {

  }

  ngOnInit() {
  }

  showDetails(item) {
    this.obj = item;
  }
}