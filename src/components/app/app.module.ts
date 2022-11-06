import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppRoutingModule } from './app-routing.module';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { HomeComponent } from '../../pages/home/home.component';
import { PostsResolver } from 'src/resolvers/posts.resolver';
import { PostPreviewBoxComponent } from '../post-preview-box/post-preview-box.component';
import { PostDetailsComponent } from 'src/pages/post-details/post-details.component';
import { PostResolver } from 'src/resolvers/post.resolver';
import { MastheadComponent } from '../masthead/masthead.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PostsCountResolver } from 'src/resolvers/posts-count.resolver';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    HomeComponent,
    PostPreviewBoxComponent,
    PostDetailsComponent,
    MastheadComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSelectModule,
    MatPaginatorModule,
  ],
  providers: [PostsResolver, PostResolver, PostsCountResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
