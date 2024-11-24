import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  Signal,
  signal, WritableSignal
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

@Component({
  selector: 'app-root',
  imports: [MatToolbar, UsersComponent, PostsComponent, PostComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  postService = inject(PostService);

  users: Signal<User[] | undefined> = signal<User[]>([]);
  selectedUser = signal<User | undefined>(undefined);

  posts = signal<Post[]>([]);

  selectedPost: WritableSignal<Post | undefined> = linkedSignal({
    source: this.selectedUser,
    computation: () => undefined
  })


  comments = signal<PostComment[]>([]);
  loadingComments = signal<boolean>(false);

  usersResource = rxResource({
    loader: () => this.postService.getUsers()
  })

  userPosts = rxResource<Post[], User | undefined>({
    request: () => this.selectedUser(),
    loader: ({request: selectedUser}) => {
      return selectedUser ?  this.postService.getPosts(selectedUser.id) : of([]);
    }
  })

  commentsResource = rxResource({
    request: () => this.selectedPost(),
    loader: ({request: selectedPost}) =>
      selectedPost ? this.postService.getComments(selectedPost.id) : of([]),
  })

}
