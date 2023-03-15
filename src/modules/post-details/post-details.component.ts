import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettingsService } from '@modules/shared/services/settings.service';
import { TagsService } from '@modules/shared/services/tags.service';
import { BooruPost } from '@modules/shared/types/BooruPost';

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
  frostedEffect = this.settingsSvc.listen('blurEffect');

  constructor(
    private route: ActivatedRoute,
    private tagsSvc: TagsService,
    private settingsSvc: SettingsService
  ) {}

  onTagClick(tag: string) {
    this.tagsSvc.addTag(tag);
  }
}
