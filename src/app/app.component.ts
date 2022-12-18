import { Component } from '@angular/core';
import { SettingsService } from './shared/services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SettingsService],
})
export class AppComponent {
  constructor(private settingsService: SettingsService) {}
  title = this.settingsService.title;
}
