import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  get historial() {
    return this.gifsService.historial;
  }

  constructor(
    private gifsService: GifsService,
    private settingsService: SettingsService
  ) {}

  title = this.settingsService.title;

  buscar(query: string) {
    this.gifsService.buscarGifs(query);
  }
}
