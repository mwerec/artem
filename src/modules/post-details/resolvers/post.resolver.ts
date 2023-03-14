import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';
import { SettingsService } from '@modules/shared/services/settings.service';
import { BooruService } from '@modules/shared/services/booru.service';
import { BooruPost } from '@modules/shared/types/BooruPost';
import { TagsService } from '@modules/shared/services/tags.service';

export const postResolver: ResolveFn<BooruPost> = (route) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const booruSvc = inject(BooruService);
  const settingsSvc = inject(SettingsService);
  const tagsSvc = inject(TagsService);

  const handleError = (message: string) => {
    router.navigate([''], {
      queryParams: { tag: tagsSvc.getSelectedTags() },
    });
    snackBar.open(message, null, {
      duration: 3000,
    });
  };

  const id = route.paramMap.get('id')!;
  return booruSvc.getPost(id).pipe(
    tap((res) => {
      if (!settingsSvc.get('safeSearch') || res.rating === 'g') return;
      handleError(`Post ${id} blocked by safe search.`);
    }),
    catchError(() => {
      handleError(`Unable to load post ${id}.`);
      return EMPTY;
    })
  );
};
