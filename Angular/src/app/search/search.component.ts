import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Router } from '@angular/router';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  obj: any = {};

  constructor(
    private employeeService: EmployeeService,
    private router: Router) {
  }

  ngOnInit() {

  }

  showDetails(item) {
    this.obj = item;
  }
}