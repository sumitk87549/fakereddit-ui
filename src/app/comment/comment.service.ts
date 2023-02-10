import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentPayload } from './comment.payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    return this.http.get<CommentPayload[]>(this.baseUrl + 'api/comments/by-post/'+postId);
  }

  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'api/comments',commentPayload);
  }

  getAllCommentsByUser(username: string): Observable<CommentPayload[]>{
    return this.http.get<CommentPayload[]>(this.baseUrl + 'api/comments/by-user'+username);

  }
}
