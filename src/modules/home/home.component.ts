import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilKeyChanged,
  skip,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { BooruService } from '@modules/shared/services/booru.service';
import { SearchService } from '@modules/shared/services/search.service';
import { SettingsService } from '@modules/shared/services/settings.service';
import { BooruPost } from '@modules/shared/types/BooruPost';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  posts = new BehaviorSubject<BooruPost[]>(this.route.snapshot.data['posts']);
  length = new BehaviorSubject<number>(this.route.snapshot.data['postsCount']);
  abortPageRequest = new Subject<void>();
  abortCountRequest = new Subject<void>();
  unsubscribe = new Subject<void>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private searchSvc: SearchService,
    private booruSvc: BooruService,
    private route: ActivatedRoute,
    private settingsSvc: SettingsService
  ) {}

  ngOnInit() {
    combineLatest([
      this.searchSvc.selectedTags,
      this.settingsSvc.listen('safeSearch'),
    ])
      .pipe(
        skip(1),
        tap(() => this.abortCountRequest.next()),
        switchMap(() =>
          this.booruSvc
            .getPostsCount(this.allTags)
            .pipe(takeUntil(this.abortCountRequest))
        ),
        takeUntil(this.unsubscribe)
      )
      .subscribe((count) => {
        this.length.next(count);
        if (this.paginator.pageIndex > 0) this.paginator.firstPage();
        else this.onPageChange(0);
      });
  }

  onPageChange(page: number) {
    this.abortPageRequest.next();
    this.booruSvc
      .getPosts(this.allTags, page + 1)
      .pipe(takeUntil(this.abortPageRequest))
      .subscribe((posts) => this.posts.next(posts));
  }

  get allTags() {
    return [
      this.settingsSvc.get('safeSearch') && 'rating:g',
      ...this.searchSvc.getSelectedTags(),
    ];
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
