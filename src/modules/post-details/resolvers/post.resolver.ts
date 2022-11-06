import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { SearchService } from 'src/modules/shared/services/search.service';
import { BooruService } from '../../shared/services/booru.service';
import { BooruPost } from '../../shared/types/BooruPost';

@Injectable()
export class PostResolver implements Resolve<BooruPost> {
  constructor(
    private booruSvc: BooruService,
    private router: Router,
    private snackBar: MatSnackBar,
    private searchSvc: SearchService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id')!;
    return this.booruSvc.getPost(id).pipe(
      catchError(() => {
        this.router.navigate([''], {
          queryParams: { tag: this.searchSvc.getSelectedTags() },
        });
        this.snackBar.open(`Unable to load post ${id}.`, null, {
          duration: 3000,
        });
        return EMPTY;
      })
    );
  }
}
