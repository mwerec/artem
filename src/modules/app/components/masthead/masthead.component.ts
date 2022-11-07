import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith, Subject, takeUntil } from 'rxjs';
import { SettingsService } from '@modules/shared/services/settings.service';
import { SearchService } from '@modules/shared/services/search.service';

@Component({
  selector: 'app-masthead',
  templateUrl: './masthead.component.html',
  styleUrls: ['./masthead.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MastheadComponent implements OnInit, OnDestroy {
  canGoBack = this.router.events.pipe(
    startWith(new NavigationEnd(0, '/', '/')),
    filter((event) => event instanceof NavigationEnd),
    map((event) => {
      const url = (event as NavigationEnd).urlAfterRedirects;
      return url !== '/' && !url.startsWith('/?');
    })
  );
  openingSettings = new Subject<boolean>();
  unsubscribe = new Subject<void>();

  @ViewChild('mast') mastRef: ElementRef<HTMLDivElement>;

  constructor(
    private router: Router,
    public searchSvc: SearchService,
    private renderer: Renderer2,
    private settingsSvc: SettingsService
  ) {}

  ngOnInit() {
    this.searchSvc.selectedTagsFull
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.renderer.removeClass(this.mastRef.nativeElement, 'shake');
        setTimeout(
          () => this.renderer.addClass(this.mastRef.nativeElement, 'shake'),
          20 // Firefox workaround
        );
      });
  }

  async openSettings() {
    this.openingSettings.next(true);
    await this.settingsSvc.open();
    this.openingSettings.next(false);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
