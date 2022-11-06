import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { PostsCountResolver } from './resolvers/posts-count.resolver';
import { PostsResolver } from './resolvers/posts.resolver';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        resolve: { posts: PostsResolver, postsCount: PostsCountResolver },
      },
    ]),
  ],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
