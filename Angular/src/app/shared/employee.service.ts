import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from './employee.model';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';

declare var M: any; // pt mesaje

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee; // folosit pt form (+post, +put(edit), +delete)
  employees: Employee[]; // folosit pt a afisa toti angajatii (+get)
  readonly baseURL = environment.rootURL + '/employees';
  // rootUrl = "http://localhost:3030/";
  constructor(private http: HttpClient) { }

  // returneaza un Observable
  // folosit la form ----- POST -----
  postEmployee(emp: Employee) {
    return this.http.post(this.baseURL, emp);
  } 

  // folosit pt returnare toti angajatii ----- GET -----
  getEmployeeList() {
    return this.http.get(this.baseURL);
  }

  // folosit pt update ----- PUT -----
  putEmployee(emp: Employee) {
    // console.log("id emp", emp._id)
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
    // console.log("print in emp " + JSON.stringify(this.getEmployeeList()))
    this.getEmployeeList().subscribe((res) => {
      this.employees = res as Employee[];

    });
    // console.log(this.employees)
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
    return this.http.get(this.baseURL, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
}
