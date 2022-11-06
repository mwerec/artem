import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { BooruService } from '../../shared/services/booru.service';
import { SearchService } from '../../shared/services/search.service';
import { BooruPost } from '../../shared/types/BooruPost';

@Injectable()
export class PostsResolver implements Resolve<BooruPost[]> {
  constructor(
    private searchSvc: SearchService,
    private booruSvc: BooruService
  ) {}

  resolve() {
    return this.searchSvc.selectedTags.pipe(
      switchMap((tags) => this.booruSvc.getPosts(tags)),
      take(1)
    );
  }
}
