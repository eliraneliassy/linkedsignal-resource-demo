import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {User} from './user.interface';
import {Post} from './post.interface';
import {PostComment} from './comment.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  httpClient = inject(HttpClient);

  BASE_URL = `https://jsonplaceholder.typicode.com`;

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.BASE_URL}/users`);
  }

  getPosts(userId: number): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.BASE_URL}/users/${userId}/posts`);

  }

  getComments(postId: number): Observable<PostComment[]> {
    return this.httpClient.get<PostComment[]>(`${this.BASE_URL}/posts/${postId}/comments`)
  }
}
