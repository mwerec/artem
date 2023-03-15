import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PostDetailsRoutingModule } from './post-details-routing.module';
import { PostDetailsComponent } from './post-details.component';
import { VideoGlowComponent } from './components/video-glow/video-glow.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    PostDetailsRoutingModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
  declarations: [PostDetailsComponent, VideoGlowComponent],
})
export default class PostDetailsModule {}
