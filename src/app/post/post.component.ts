import {Component, input} from '@angular/core';
import {Post} from '../post.interface';
import {PostComment} from '../comment.interface';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-post',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatProgressSpinner
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  post = input<Post | undefined>(undefined);
  comments = input<PostComment[]>();
  loadingComments = input<boolean>(false);
}
