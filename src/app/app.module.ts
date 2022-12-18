import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SettingsService } from './shared/services/settings.service';
import { GifsModule } from './gifs/gifs.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, SharedModule, GifsModule],
  providers: [SettingsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
