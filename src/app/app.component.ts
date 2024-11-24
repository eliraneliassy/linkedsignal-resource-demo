import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  linkedSignal, resource,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PostService} from './post.service';
import {User} from './user.interface';
import {rxResource, toSignal} from '@angular/core/rxjs-interop';
import {JsonPipe} from '@angular/common';
import {MatToolbar} from '@angular/material/toolbar';
import {UsersComponent} from './users/users.component';
import {PostsComponent} from './posts/posts.component';
import {PostComponent} from './post/post.component';
import {Post} from './post.interface';
import {PostComment} from './comment.interface';
import {of} from 'rxjs';
import {Comment} from '@angular/compiler';

@Component({
  selector: 'app-root',
  imports: [MatToolbar, UsersComponent, PostsComponent, PostComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  postService = inject(PostService);


  selectedUser = signal<User | undefined>(undefined);

  selectedPost: WritableSignal<Post | undefined> = linkedSignal({
    source: () => this.selectedUser(),
    computation: () => undefined
  });


    usersResource = resource<User[], unknown>({
      loader: () => fetch(`https://jsonplaceholder.typicode.com/users`).then(res => res.json()) as Promise<User[]>// this.postService.getUsers()
    })

    postsResource = rxResource<Post[], User | undefined>({
      request: () => this.selectedUser(),
      loader: ({request: selectedUser}) => selectedUser ? this.postService.getPosts(selectedUser.id) : of([])
    })

    commentsResource = rxResource<PostComment[], Post | undefined>({
      request: () => this.selectedPost(),
      loader: ({request: selectedPost}) => selectedPost ? this.postService.getComments(selectedPost.id) : of([])
    } )


}
