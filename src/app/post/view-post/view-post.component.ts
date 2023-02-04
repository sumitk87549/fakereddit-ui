import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit{
  
  postId: number;
  post: PostModel;
  commentFormGroup: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[];

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute,private commentService:CommentService){
    this.postId = this.activatedRoute.snapshot.params['id'];

    this.commentFormGroup = new FormGroup ({
      text: new FormControl('',Validators.required)
    });

    this.commentPayload = {
      text: '',
      postId: this.postId
    };

  }
  
  ngOnInit(): void {
    this.getPostById();

  }

  postComment(){
    this.commentPayload.text = this.commentFormGroup.get('text')?.value;
    this.commentService.postComment(this.commentPayload).subscribe(data=>{
      this.commentFormGroup.get('text')?.setValue('');
      this.getCommentsForPost();
    }, error => {
      throwError(error);
    })
  }

  private getPostById(){
    this.postService.getPost(this.postId).subscribe(data=>{
      this.post = data;
    }, error => {
      throwError(error);
    })
  }
  
  getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data=>{
      this.comments = data;
    }, error => {
      throwError(error);
    })
  }
}
