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
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentSectionService {

  options;
  // domain = this.apiService.domain;

  // rootURL = "http://localhost:3030/blogs";
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
    console.log(environment.rootURL)
    return this.http.post(environment.rootURL + '/blogs/newBlog', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  getAllBlogs() {
    return this.http.get(environment.rootURL + '/blogs/allBlogs', {
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
    return this.http.post(environment.rootURL + '/blogs/comment', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });

  }

  getSingleBlog(id) {
    return this.http.get(environment.rootURL + '/blogs/singleBlog/' + id, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  putComment(comment: CommentModel) {
    // console.log
    // console.log("id user: ", user._id)
    return this.http.put(environment.rootURL + `/blogs/${comment._id}`, comment);
  }

  // refreshComment() {
  //   this.getAllBlogs().subscribe((res) => {
  //     this.selectedComment = res as CommentModel;
  //   });
  // }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.selectedComment = {
      _id: "",
      title: "",
      body: "",
      createdBy: "",
      createdAt: null
    }
  }
}