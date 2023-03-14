import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appFrostedEffect]',
})
export class FrostedEffectDirective {
  @Input()
  @HostBinding('style.--app-frosted-effect-opacity')
  appFrostedEffectOpacity: number;

  @Input()
  @HostBinding('style.--app-frosted-effect-strength.px')
  appFrostedEffectStrength: number;

  @HostBinding(`class.app-frosted-effect`)
  readonly appFrostedEffect = true;
}
