import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, of, startWith, switchMap } from 'rxjs';
import { BooruService } from '../shared/services/booru.service';
import { SearchService } from '../shared/services/search.service';
import { BooruPost } from '../shared/types/BooruPost';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  currentPage = this.formBuilder.control(1);
  posts = combineLatest([
    this.searchSvc.selectedTags,
    this.currentPage.valueChanges.pipe(startWith(1)),
  ]).pipe(
    switchMap(([tags, page], i) =>
      i === 0
        ? of(this.route.snapshot.data['posts'] as BooruPost[])
        : this.booruSvc.getPosts(tags, page!)
    )
  );
  totalPosts = this.searchSvc.selectedTags.pipe(
    switchMap((tags, i) =>
      i === 0
        ? of(this.route.snapshot.data['postsCount'] as number)
        : this.booruSvc.getPostsCount(tags)
    )
  );

  constructor(
    private searchSvc: SearchService,
    private booruSvc: BooruService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  onPageChange(page: number) {
    this.currentPage.setValue(page + 1);
  }
}
