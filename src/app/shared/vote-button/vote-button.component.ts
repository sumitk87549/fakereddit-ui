import { Component, Input, OnInit } from '@angular/core';

import { faArrowDown, faArrowUp, faComment } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { PostModel } from '../post-model';
import { PostService } from '../post.service';
import { VoteService } from '../vote.service';
import { VotePayload } from './vote-payload';
import { VoteType } from './vote-type';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit{
  
  @Input() post: PostModel;
  votePayload: VotePayload;
  isLoggedIn: boolean;
  upvoteColor:string;
  downvoteColor: string;
  faArrowUpIcon = faArrowUp;
  faArrowDownIcon = faArrowDown;  
  
  constructor(private voteService: VoteService, private authService: AuthService, private postService: PostService, private toastr: ToastrService){
    this.votePayload = {
      voteType: undefined!,
      postId: undefined!
    }
    this.authService.loggedIn.subscribe((data:boolean) => this.isLoggedIn = data);
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  upvotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
  }

  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
  }

  vote() {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(() => {
        this.updateVoteDetails();
      }, error => {
        this.toastr.error(error.error.message);
        throwError(error);
      });
  }

  private updateVoteDetails(){
    this.postService.getPost(this.post.id).subscribe(data => this.post = data);
  }

  private setColorWhenUpvoteAndUserLoggedIn(){    
  }

}
