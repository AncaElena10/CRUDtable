import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from './employee.model';
import { NgForm } from '@angular/forms';

declare var M: any; // pt mesaje

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee; // folosit pt form (+post, +put(edit), +delete)
  employees: Employee[]; // folosit pt a afisa toti angajatii (+get)
  readonly baseURL = 'http://localhost:3000/employees';
  readonly baseURL2 = 'http://localhost:3000/bla';
  rootUrl = "http://localhost:3000/";
  constructor(private http: HttpClient) { }

  // returneaza un Observable
  // folosit la form ----- POST -----
  postEmployee(emp: Employee) {
    return this.http.post(this.baseURL, emp);
  } 

  // folosit pt returnare toti angajatii ----- GET -----
  getEmployeeList() {
    return this.http.get(this.rootUrl + "employees");
  }

  // folosit pt update ----- PUT -----
  putEmployee(emp: Employee) {
    // modificare in timp real
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

  // folosit pt a sterge intare
  deleteEmployee(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  // functie folosita pt a nu fi nevoie sa se dea refresh manual la pagina
  // in cazul in care se insereaza/updateaza
  // functie share-uita de cele 2 componente (modal + employee)
  refreshEmployeeList() {
    this.getEmployeeList().subscribe((res) => {
      this.employees = res as Employee[];
    });
  }

  // functie share-uita de cele 2 componente (modal + employee)
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
    return this.http.get(this.rootUrl + 'employees', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
}
