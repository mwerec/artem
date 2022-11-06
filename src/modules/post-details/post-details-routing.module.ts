import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostResolver } from './resolvers/post.resolver';
import { PostDetailsComponent } from './post-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PostDetailsComponent,
        resolve: { post: PostResolver },
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PostDetailsRoutingModule {}
