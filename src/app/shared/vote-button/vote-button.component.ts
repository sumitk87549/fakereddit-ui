import { Component, Input, OnInit } from '@angular/core';

import { faArrowDown, faArrowUp, faComment } from '@fortawesome/free-solid-svg-icons';
import { PostModel } from '../post-model';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit{
  
  @Input() post: PostModel;

  faArrowUpIcon = faArrowUp;
  faArrowDownIcon = faArrowDown;  
  
  constructor(){}

  ngOnInit(): void {
  }

  upvotePost() {

  }

  downvotePost() {

  }

}
