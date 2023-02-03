import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { PostService } from 'src/app/shared/post.service';
import { SubredditModel } from 'src/app/subreddit/subreddit-response';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { NewPostPayload } from './create-post.payload';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit{
  
  createPostFormGroup: FormGroup;
  newPostPayload: NewPostPayload;
  subreddits: Array<SubredditModel>;

  constructor(private router: Router, private subredditService: SubredditService, private postService: PostService){
    this.newPostPayload = {
      postName:'',
      url:'',
      description:'',
      subredditName:''
    }
  }

  ngOnInit() {
    this.createPostFormGroup = new FormGroup ({
      postName: new FormControl('',Validators.required),
      subredditName: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      url: new FormControl('',Validators.required)
    });
    this.subredditService.getAllSubreddits().subscribe((data) => {
      this.subreddits = data;
    }, error => {
      throwError(error);
    })
  }

  createPost(){
    this.newPostPayload.postName = this.createPostFormGroup.get('postName')?.value;
    this.newPostPayload.description = this.createPostFormGroup.get('description')?.value;
    this.newPostPayload.subredditName = this.createPostFormGroup.get('subredditName')?.value;
    this.newPostPayload.url = this.createPostFormGroup.get('url')?.value;
    this.postService.createPost(this.newPostPayload).subscribe((data)=>{
      this.router.navigateByUrl('/');
    },
    (error)=>{
      throwError(error);
    })
  }

  discardPost(){
    this.router.navigateByUrl('/'); 
  }


}
