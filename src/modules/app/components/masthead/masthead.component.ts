import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { combineLatest, filter, map, Subject, takeUntil } from 'rxjs';
import { PaginatorService } from '@modules/shared/services/paginator.service';
import { TagsService } from '@modules/shared/services/tags.service';
import { SearchService } from '@modules/shared/services/search.service';

@Component({
  selector: 'app-masthead',
  templateUrl: './masthead.component.html',
  styleUrls: ['./masthead.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MastheadComponent implements OnInit, OnDestroy {
  /**
   * Kinda shit, there are better ways to do it, but I'm too lazy
   * Consider injecting components for each page instead
   * @deprecated fuk u fix me :)
   */
  controls = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event) => {
      const url = (event as NavigationEnd).urlAfterRedirects;
      return url !== '/' && !url.startsWith('/?')
        ? this.backBtnRef
        : this.paginatorRef;
    })
  );
  unsubscribe = new Subject<void>();

  @ViewChild('backBtn') backBtnRef: TemplateRef<void>;
  @ViewChild('paginator') paginatorRef: TemplateRef<void>;

  paginatorInfo = combineLatest([
    this.paginatorSvc.page,
    this.paginatorSvc.length,
  ]).pipe(
    map(
      ([page, length]) =>
        `${(page - 1) * 100 + 1} – ${Math.min(page * 100, length)} of ${length}`
    )
  );
  paginatorTooltipInfo = combineLatest([
    this.paginatorSvc.page,
    this.paginatorSvc.totalPages,
  ]).pipe(map(([page, total]) => `Page ${page} of ${total}`));

  constructor(
    private router: Router,
    public paginatorSvc: PaginatorService,
    public searchSvc: SearchService,
    public tagsSvc: TagsService,
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLUnknownElement>
  ) {}

  ngOnInit() {
    this.tagsSvc.tagsAddFail.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.renderer.removeClass(this.elementRef.nativeElement, 'shake');
      setTimeout(
        () => this.renderer.addClass(this.elementRef.nativeElement, 'shake'),
        20 // Firefox workaround
      );
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
