import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentSectionService } from '../shared/comment-section.service';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { ignoreElements } from 'rxjs/operators';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {

  // commentForm: FormGroup = new FormGroup({
  //   title: new FormControl(null, [Validators.required]),
  //   user: new FormControl(null, [Validators.required]),
  //   comment: new FormControl(null, [Validators.required]),
  // })
  id_user: any = "";
  commentToDisplay: any = "";
  id_user_from_comm: any = "";
  showCommFromUser: boolean = false;

  commentForm: FormGroup = new FormGroup({
    title: new FormControl(null),
    comment: new FormControl(null),
    _id_user: new FormControl(null)
  })

  constructor(private commentService: CommentSectionService, private router: Router, private apiService: ApiService) {

  }

  // extractInfo(data) {
  //   this.id_user = data._id;

  //   // console.log(this._id_user)
  // }

  // extractCommentInfo(data) {
  //   // console.log(data)
  //   this.id_user_from_comm = data._id_user;
  // }

  ngOnInit() {
    // this.apiService.user()
    //   .subscribe(
    //     data => {
    //       this.extractInfo(data)
    //     }
    //   )

    //   this.commentService.comment()
    //   .subscribe(
    //     data => {
    //       this.extractCommentInfo(data)
    //     }
    //   )
  }

  // func() {
  //   if (this.id_user == this.id_user_from_comm) {
  //     this.showCommFromUser = true;
  //   }
  // }

  // get title() {
  //   return this.commentForm.get('title');
  // }

  // get comment() {
  //   return this.commentForm.get('comment');
  // }

  // register(event) {
  //   // console.log(event)
  //   // console.log(this._id_user)
  //   this.commentForm.value._id_user = this.id_user
  //   if (!this.commentForm.valid) {
  //     console.log('Invalid Form'); return;
  //   }

  //   // console.log(this.commentForm.value);

  //   this.commentService.commentRegister(JSON.stringify(this.commentForm.value))
  //     .subscribe(
  //       data => { console.log(data); },
  //       error => console.error("eroare comment register" + error)
  //     )
  // }
}
