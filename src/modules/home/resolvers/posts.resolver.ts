import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SettingsService } from '@modules/shared/services/settings.service';
import { BooruService } from '@modules/shared/services/booru.service';
import { SearchService } from '@modules/shared/services/search.service';
import { BooruPost } from '@modules/shared/types/BooruPost';

@Injectable()
export class PostsResolver implements Resolve<BooruPost[]> {
  constructor(
    private searchSvc: SearchService,
    private settingsSvc: SettingsService,
    private booruSvc: BooruService
  ) {}

  resolve() {
    const tags = this.searchSvc.getSelectedTags();
    const safeSearch = this.settingsSvc.get('safeSearch');
    return this.booruSvc.getPosts([safeSearch && 'rating:g', ...tags]);
  }
}
