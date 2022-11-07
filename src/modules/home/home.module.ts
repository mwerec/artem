import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '@modules/shared/shared.module';
import { PostPreviewBoxComponent } from './components/post-preview-box/post-preview-box.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PostsCountResolver } from './resolvers/posts-count.resolver';
import { PostsResolver } from './resolvers/posts.resolver';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, MatPaginatorModule, SharedModule],
  declarations: [HomeComponent, PostPreviewBoxComponent],
  providers: [PostsCountResolver, PostsResolver],
})
export class HomeModule {}
