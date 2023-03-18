import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () => import('@modules/home/home.module'),
        },
        {
          path: 'posts/:id',
          loadChildren: () =>
            import('@modules/post-details/post-details.module'),
        },
        {
          path: '**',
          redirectTo: '',
        },
      ],
      { scrollPositionRestoration: 'enabled' }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
