import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'posts/:id',
        loadChildren: () =>
          import('../post-details/post-details.module').then(
            (m) => m.PostDetailsModule
          ),
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
