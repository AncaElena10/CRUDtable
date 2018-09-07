import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from './employee.model';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];
  readonly baseURL = environment.rootURL + '/employees';
  constructor(private http: HttpClient) { }

  postEmployee(emp: Employee) {
    return this.http.post(this.baseURL, emp);
  }

  getEmployeeList() {
    return this.http.get(this.baseURL);
  }

  putEmployee(emp: Employee) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  refreshEmployeeList() {
    this.getEmployeeList().subscribe((res) => {
      this.employees = res as Employee[];

    });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.selectedEmployee = {
      _id: "",
      name: "",
      position: "",
      office: "",
      salary: null
    }
  }

  employee() {
    return this.http.get(this.baseURL, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
}
