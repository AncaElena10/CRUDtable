// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class CommentSectionService {

//   rootURL = "http://localhost:3000/section";

//   constructor(private http: HttpClient) { }

//   commentRegister(body: any) {
//     return this.http.post(this.rootURL + '/comment', body, {
//       observe: 'body',
//       headers: new HttpHeaders().append('Content-Type', 'application/json')
//     });
//   }

//   comment() {
//     return this.http.get(this.rootURL + '/comment_details', {
//       observe: 'body',
//       withCredentials: true,
//       headers: new HttpHeaders().append('Content-Type', 'application/json')
//     });
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { User } from './user.model';
import { NgForm } from '../../../node_modules/@angular/forms';
import { ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CommentModel } from './comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentSectionService {

  options;
  // domain = this.apiService.domain;

  rootURL = "http://localhost:3000/blogs";
  selectedComment: CommentModel;

  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) { }

  // Function to create a new blog post
  // newBlog(blog) {
  //   // this.createAuthenticationHeaders(); // Create headers
  //   return this.http.post(this.rootURL + 'newBlog', blog, this.options).map(res => res.json());
  // }

  newBlog(body: any) {
    return this.http.post(this.rootURL + '/newBlog', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  getAllBlogs() {
    return this.http.get(this.rootURL + '/allBlogs', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  postComment(id, comment) {
    const body = {
      id: id,
      comment: comment
    }
    return this.http.post(this.rootURL + '/comment', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });

  }

  // comment() {
  //   return this.http.get(this.rootURL + '/allBlogs', {
  //     observe: 'body',
  //     withCredentials: true,
  //     headers: new HttpHeaders().append('Content-Type', 'application/json')
  //   });
  // }

  getSingleBlog(id) {
    return this.http.get(this.rootURL + '/singleBlog/' + id, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  // refreshComment(id) {
  //   // console.log("print in user " + JSON.stringify(this.getUser()))
  //   this.getAllBlogs().subscribe((res) => {
  //     this.selectedComment = res as CommentModel;

  //   });
  //   // console.log(this.selectedUser)
  // }

  // resetForm(form?: NgForm) {
  //   if (form) {
  //     form.reset();
  //   }
  //   this.selectedComment = {
  //     _id: "",
  //     title: "",
  //     body: "",
  //     createdBy: "",
  //     profilePicture: null,
  //     createdAt: null
  //   }
  // }
}