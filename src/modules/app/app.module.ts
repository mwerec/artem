import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MastheadComponent } from './components/masthead/masthead.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay';
import { SharedModule } from '@modules/shared/shared.module';

@NgModule({
  declarations: [AppComponent, SearchBarComponent, MastheadComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatButtonModule,
    MatTooltipModule,
    OverlayModule,
    MatProgressSpinnerModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
