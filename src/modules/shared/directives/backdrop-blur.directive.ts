import {
  Directive,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SettingsService } from '../services/settings.service';

@Directive({
  selector: '[appBackdropBlur]',
})
export class BackdropBlurDirective implements OnInit, OnDestroy {
  static readonly className = 'app-backdrop-blur';

  @HostBinding(`class.${BackdropBlurDirective.className}-base`)
  readonly appBackdropBlur = true;

  unsubscribe = new Subject<void>();

  constructor(
    private settingsSvc: SettingsService,
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLUnknownElement>
  ) {}

  ngOnInit() {
    this.settingsSvc
      .listen('blurEffect')
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((enabled) => {
        if (enabled) {
          this.renderer.addClass(
            this.elementRef.nativeElement,
            BackdropBlurDirective.className + '__enabled'
          );
        } else {
          this.renderer.removeClass(
            this.elementRef.nativeElement,
            BackdropBlurDirective.className + '__enabled'
          );
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
