import {
  trigger,
  transition,
  style,
  animate,
  AnimationEvent,
  state,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BehaviorSubject } from 'rxjs';
import { SharedModule } from '@modules/shared/shared.module';
import { SettingsService } from '@modules/shared/services/settings.service';
import { SettingsDialogRef } from './classes/settings-dialog-ref';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatIconModule,
    SharedModule,
    MatButtonModule,
    MatSliderModule,
    MatCheckboxModule,
    MatRadioModule,
    OverlayModule,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('settings', [
      state(
        'void, leave',
        style({ opacity: 0, transform: 'translateX(50px)' })
      ),
      transition(
        '* => enter',
        animate(
          '150ms cubic-bezier(0, 0, 0.2, 1)',
          style({ opacity: 1, transform: 'translateX(0)' })
        )
      ),
      transition(
        '* => void, * => leave',
        animate(
          '75ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          style({ opacity: 0, transform: 'translateX(20px)' })
        )
      ),
    ]),
  ],
})
export class SettingsComponent {
  static readonly DialogRef = SettingsDialogRef;

  safeSearchChecked = this.settingsSvc.listen('safeSearch');
  animationState = new BehaviorSubject<'void' | 'enter' | 'leave'>('enter');
  animationStateChanged = new EventEmitter<AnimationEvent>();

  @ViewChild('warningTemplate') warningTemplate: TemplateRef<void>;

  constructor(
    public settingsSvc: SettingsService,
    private settingsDialogRef: SettingsDialogRef,
    private dialog: MatDialog,
    private overlay: Overlay
  ) {}

  // FIXME
  // Workaround for (click).preventDefault() not stopping
  // the toggle from changing its state
  // Happening since Material v15
  onSafeSearchChange(event: MatSlideToggleChange) {
    if (!event.source.checked) event.source.checked = true;
  }

  onSafeSearchClick(event: MouseEvent) {
    event.preventDefault();
    const safeSearch = !this.settingsSvc.get('safeSearch');
    if (safeSearch || localStorage.getItem('safeSearchWarningDisabled')) {
      return this.settingsSvc.set({ safeSearch });
    }

    this.dialog
      .open(this.warningTemplate, {
        width: '650px',
        scrollStrategy: this.overlay.scrollStrategies.noop(),
      })
      .beforeClosed()
      .subscribe((res) => {
        if (!res) return;
        this.settingsSvc.set({ safeSearch });
        if (res.disableWarning) {
          localStorage.setItem('safeSearchWarningDisabled', 'Y');
        }
      });
  }

  formatPreviewScaleLabel(value: number) {
    return value * 100 + '%';
  }

  // that's really unprofessional and i feel ashamed
  onAmogusClick(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    const audio = new Audio();
    audio.src = 'assets/amogus.mp3';
    audio.load();
    audio.play();
  }

  startExitAnimation() {
    this.animationState.next('leave');
  }

  onAnimationStart(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  onAnimationDone(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  close() {
    this.settingsDialogRef.close();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.close();
    }
  }
}
