import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { BooruService } from '../../shared/services/booru.service';
import { SearchService } from '../../shared/services/search.service';

@Injectable()
export class PostsCountResolver implements Resolve<number> {
  constructor(
    private searchSvc: SearchService,
    private booruSvc: BooruService
  ) {}

  resolve() {
    return this.searchSvc.selectedTags.pipe(
      switchMap((tags) => this.booruSvc.getPostsCount(tags)),
      take(1)
    );
  }
}
