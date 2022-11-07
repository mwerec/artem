import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';
import { SearchService } from '@modules/shared/services/search.service';
import { SettingsService } from '@modules/shared/services/settings.service';
import { BooruService } from '@modules/shared/services/booru.service';
import { BooruPost } from '@modules/shared/types/BooruPost';

@Injectable()
export class PostResolver implements Resolve<BooruPost> {
  constructor(
    private booruSvc: BooruService,
    private router: Router,
    private snackBar: MatSnackBar,
    private searchSvc: SearchService,
    private settingsSvc: SettingsService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id')!;
    return this.booruSvc.getPost(id).pipe(
      tap((res) => {
        if (!this.settingsSvc.get('safeSearch') || res.rating === 'g') return;
        this.handleError(`Post ${id} blocked by safe search.`);
      }),
      catchError(() => {
        this.handleError(`Unable to load post ${id}.`);
        return EMPTY;
      })
    );
  }

  handleError(message: string) {
    this.router.navigate([''], {
      queryParams: { tag: this.searchSvc.getSelectedTags() },
    });
    this.snackBar.open(message, null, {
      duration: 3000,
    });
  }
}
