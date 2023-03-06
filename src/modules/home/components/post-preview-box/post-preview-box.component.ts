import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SettingsService } from '@modules/shared/services/settings.service';
import { BooruPost } from '@modules/shared/types/BooruPost';

@Component({
  selector: 'app-post-preview-box',
  templateUrl: './post-preview-box.component.html',
  styleUrls: ['./post-preview-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPreviewBoxComponent {
  @Input() post: BooruPost;
  format = this.settingsSvc.listen('previewFormat');

  constructor(private settingsSvc: SettingsService) {}
}
