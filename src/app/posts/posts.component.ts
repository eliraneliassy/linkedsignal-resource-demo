import {Component, input, model} from '@angular/core';
import {Post} from '../post.interface';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-posts',
  imports: [MatListModule, MatProgressSpinner],
  templateUrl: './posts.component.html',
  standalone: true,
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  posts = input<Post[]>([]);
  selectedPost = model<Post | undefined>(undefined);
  loadingPosts = input<boolean>(false);

  selectPost(post: Post) {
    this.selectedPost.set(post);
  }

}
