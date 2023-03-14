import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  finalize,
  map,
  of,
  skip,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { BooruService } from '@modules/shared/services/booru.service';
import { PaginatorService } from '@modules/shared/services/paginator.service';
import { SettingsService } from '@modules/shared/services/settings.service';
import { TagsService } from '@modules/shared/services/tags.service';
import { BooruPost } from '@modules/shared/types/BooruPost';
import { SearchService } from '@modules/shared/services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  posts = new BehaviorSubject<BooruPost[]>(this.route.snapshot.data['posts']);
  abortPageRequest = new Subject<void>();
  abortCountRequest = new Subject<void>();
  unsubscribe = new Subject<void>();
  isFetchingPage = new BehaviorSubject(false);
  isListCentered = this.settingsSvc
    .listen('previewFormat')
    .pipe(map((format) => format === 'square'));

  constructor(
    private tagsSvc: TagsService,
    private paginatorSvc: PaginatorService,
    private booruSvc: BooruService,
    private route: ActivatedRoute,
    private settingsSvc: SettingsService,
    private searchSvc: SearchService
  ) {}

  ngOnInit() {
    this.paginatorSvc.setLength(this.route.snapshot.data['postsCount']);

    // Update search state whenever user navigates
    // using browser's controls
    this.route.queryParamMap
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((params) =>
        this.searchSvc.override({
          page: Number(params.get('page')) || null,
          tag: params.getAll('tag'),
        })
      );

    // Recount posts when tags change
    combineLatest([
      this.tagsSvc.selectedTags,
      this.settingsSvc.listen('safeSearch'),
    ])
      .pipe(
        skip(1),
        tap(() => this.abortCountRequest.next()),
        switchMap(([tags, safeSearch]) =>
          this.booruSvc.getPostsCount([safeSearch && 'rating:g', ...tags]).pipe(
            catchError(() => of(0)),
            takeUntil(this.abortCountRequest)
          )
        ),
        takeUntil(this.unsubscribe)
      )
      .subscribe((count) => {
        this.paginatorSvc.setLength(count);
      });

    // Fetch new posts
    combineLatest([
      this.route.queryParamMap,
      this.settingsSvc.listen('safeSearch'),
    ])
      .pipe(
        skip(1),
        tap(() => {
          this.abortPageRequest.next();
          this.isFetchingPage.next(true);
        }),
        switchMap(([params, safeSearch]) =>
          this.booruSvc
            .getPosts(
              [safeSearch && 'rating:g', ...params.getAll('tag')],
              Number(params.get('page')) || 1
            )
            .pipe(
              catchError(() => of([])),
              finalize(() => this.isFetchingPage.next(false)),
              takeUntil(this.abortPageRequest)
            )
        ),
        takeUntil(this.unsubscribe)
      )
      .subscribe((posts) => this.posts.next(posts));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
