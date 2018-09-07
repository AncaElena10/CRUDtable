import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '../../../node_modules/@angular/forms';
import { ApiService } from './api.service';
import { CommentModel } from './comment.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentSectionService {

  options;
  selectedComment: CommentModel;

  constructor(private http: HttpClient) { }

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
    return this.http.put(environment.rootURL + `/blogs/${comment._id}`, comment);
  }

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