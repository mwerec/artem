import { OverlayRef } from '@angular/cdk/overlay';
import { filter, take } from 'rxjs';
import { SettingsComponent } from '../settings.component';

export class SettingsDialogRef {
  componentInstance: SettingsComponent;

  constructor(private overlayRef: OverlayRef) {}

  close() {
    this.componentInstance.animationStateChanged
      .pipe(
        filter((e) => e.phaseName === 'start'),
        take(1)
      )
      .subscribe(() => this.overlayRef.detachBackdrop());

    this.componentInstance.animationStateChanged
      .pipe(
        filter((e) => e.phaseName === 'done' && e.toState === 'leave'),
        take(1)
      )
      .subscribe(() => {
        this.overlayRef.dispose();
        this.componentInstance = null;
      });

    this.componentInstance.startExitAnimation();
  }
}
