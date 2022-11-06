import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostsResolver } from 'src/resolvers/posts.resolver';
import { HomeComponent } from '../../pages/home/home.component';
import { PostDetailsComponent } from 'src/pages/post-details/post-details.component';
import { PostResolver } from 'src/resolvers/post.resolver';
import { PostsCountResolver } from 'src/resolvers/posts-count.resolver';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
        resolve: { posts: PostsResolver, postsCount: PostsCountResolver },
      },
      {
        path: 'posts/:id',
        component: PostDetailsComponent,
        resolve: { post: PostResolver },
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
