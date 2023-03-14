import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  ActivationStart,
  ResolveStart,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { map } from 'rxjs';
import { SettingsService } from '@modules/shared/services/settings.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  isNavigating = this.router.events.pipe(
    map(
      (event) =>
        event instanceof RouteConfigLoadStart ||
        event instanceof ActivationStart ||
        event instanceof ResolveStart
    )
  );

  constructor(
    private router: Router,
    private settingsSvc: SettingsService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.settingsSvc.listen('previewScale').subscribe((scale) => {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        '--app-preview-scale',
        scale === 1 ? null : scale,
        2
      );
    });

    this.settingsSvc.listen('blurEffect').subscribe((enabled) => {
      const args = [this.document.body, 'app-frosted-effects', ''] as const;

      if (enabled) this.renderer.setAttribute(...args);
      else this.renderer.removeAttribute(...args);
    });
  }
}
