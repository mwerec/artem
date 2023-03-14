import { NgModule } from '@angular/core';
import { FrostedEffectDirective } from './directives/frosted-effect.directive';

@NgModule({
  declarations: [FrostedEffectDirective],
  exports: [FrostedEffectDirective],
})
export class SharedModule {}
