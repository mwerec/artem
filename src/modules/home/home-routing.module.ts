import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { postsCountResolver } from './resolvers/posts-count.resolver';
import { postsResolver } from './resolvers/posts.resolver';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        resolve: { posts: postsResolver, postsCount: postsCountResolver },
      },
    ]),
  ],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
