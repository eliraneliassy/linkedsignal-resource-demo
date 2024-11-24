import {ChangeDetectionStrategy, Component, effect, inject, Signal, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PostService} from './post.service';
import {User} from './user.interface';
import {toSignal} from '@angular/core/rxjs-interop';
import {JsonPipe} from '@angular/common';
import {MatToolbar} from '@angular/material/toolbar';
import {UsersComponent} from './users/users.component';
import {PostsComponent} from './posts/posts.component';
import {PostComponent} from './post/post.component';
import {Post} from './post.interface';
import {PostComment} from './comment.interface';

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
  selectedPost = signal<Post | undefined>(undefined);
  loadingPosts = signal<boolean>(false);

  comments = signal<PostComment[]>([]);
  loadingComments = signal<boolean>(false);


  constructor() {
    this.users = toSignal(this.postService.getUsers());

    effect(() => {

      const selectedUser = this.selectedUser();

      if (selectedUser) {
        this.loadingPosts.set(true);
        this.postService.getPosts(selectedUser.id).subscribe((posts) => {
            this.posts.set(posts);
            this.loadingPosts.set(false);
          }
        )
      }

    });

    effect(() => {
      const selectedPost =  this.selectedPost();

      if (selectedPost) {
        this.loadingComments.set(true);
        this.postService.getComments(selectedPost.id).subscribe((comments) => {
          this.loadingComments.set(false);
          this.comments.set(comments);
        })
      }

    });
  }
}
