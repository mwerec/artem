import { NgModule } from '@angular/core';
import { BackdropBlurDirective } from './directives/backdrop-blur.directive';

@NgModule({
  declarations: [BackdropBlurDirective],
  exports: [BackdropBlurDirective],
})
export class SharedModule {}
