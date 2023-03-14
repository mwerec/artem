import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { postResolver } from './resolvers/post.resolver';
import { PostDetailsComponent } from './post-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PostDetailsComponent,
        resolve: { post: postResolver }
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PostDetailsRoutingModule {}
