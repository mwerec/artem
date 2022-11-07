import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SettingsService } from '@modules/shared/services/settings.service';
import { BooruService } from '@modules/shared/services/booru.service';
import { SearchService } from '@modules/shared/services/search.service';

@Injectable()
export class PostsCountResolver implements Resolve<number> {
  constructor(
    private searchSvc: SearchService,
    private booruSvc: BooruService,
    private settingsSvc: SettingsService
  ) {}

  resolve() {
    const tags = this.searchSvc.getSelectedTags();
    const safeSearch = this.settingsSvc.get('safeSearch');
    return this.booruSvc.getPostsCount([safeSearch && 'rating:g', ...tags]);
  }
}
