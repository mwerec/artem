import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../shared/services/search.service';
import { BooruPost } from '../shared/types/BooruPost';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailsComponent {
  post: BooruPost = this.route.snapshot.data['post'];
  tags = this.post.tag_string.split(' ');
  isVideo = ['mp4', 'webm', 'zip'].includes(this.post.file_ext);

  constructor(
    private route: ActivatedRoute,
    private searchSvc: SearchService
  ) {}

  onTagClick(tag: string) {
    this.searchSvc.addTag(tag);
  }
}
