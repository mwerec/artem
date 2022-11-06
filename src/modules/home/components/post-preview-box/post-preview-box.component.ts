import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BooruPost } from '../../../shared/types/BooruPost';

@Component({
  selector: 'app-post-preview-box',
  templateUrl: './post-preview-box.component.html',
  styleUrls: ['./post-preview-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPreviewBoxComponent {
  @Input() post: BooruPost;
}
