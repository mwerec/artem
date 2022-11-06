import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PostResolver } from './resolvers/post.resolver';
import { PostDetailsRoutingModule } from './post-details-routing.module';
import { PostDetailsComponent } from './post-details.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    PostDetailsRoutingModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  declarations: [PostDetailsComponent],
  providers: [PostResolver],
})
export class PostDetailsModule {}
