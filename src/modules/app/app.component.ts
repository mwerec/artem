import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  ActivationStart,
  ResolveStart,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { map, skip } from 'rxjs';
import { SearchService } from '@modules/shared/services/search.service';
import { SettingsService } from '@modules/shared/services/settings.service';

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
    private searchSvc: SearchService,
    private settingsSvc: SettingsService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.searchSvc.selectedTags.pipe(skip(1)).subscribe((tags) => {
      this.router.navigate([''], { queryParams: { tag: tags } });
    });

    this.settingsSvc.listen('previewScale').subscribe((scale) => {
      this.renderer.setStyle(this.elementRef.nativeElement, '--app-preview-scale', scale, 2)
    });
  }
}
