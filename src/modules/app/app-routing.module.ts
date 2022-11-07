import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () =>
          import('@modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'posts/:id',
        loadChildren: () =>
          import('@modules/post-details/post-details.module').then(
            (m) => m.PostDetailsModule
          ),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
