import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SettingsService } from '@modules/shared/services/settings.service';

@Component({
  selector: 'app-settings-trigger',
  templateUrl: './settings-trigger.component.html',
  styleUrls: ['./settings-trigger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsTriggerComponent {
  constructor(private settingsSvc: SettingsService) {}

  onClick() {
    this.settingsSvc.open();
  }
}
