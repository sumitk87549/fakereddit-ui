import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewPostPayload } from '../post/create-post/create-post.payload';
import { PostModel } from './post-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>(this.baseUrl + 'api/posts/');
  }

  createPost(newPostPayload: NewPostPayload): Observable<any> {
    return this.http.post(this.baseUrl + 'api/posts/',newPostPayload);
  }

  getPost(postId: number): Observable<PostModel> {
    return this.http.get<PostModel>(this.baseUrl + 'api/posts/' + postId);
  }

  getPostsByUser(username: string) : Observable<PostModel[]> {
    return this.http.get<PostModel[]>(this.baseUrl + 'api/posts/by_username/'+ username);
  }

}
