import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { BooruService } from 'src/services/booru.service';
import { SearchService } from 'src/services/search.service';
import { BooruPost } from 'src/types/BooruPost';

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
