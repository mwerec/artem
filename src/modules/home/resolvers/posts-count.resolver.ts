import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SettingsService } from '@modules/shared/services/settings.service';
import { BooruService } from '@modules/shared/services/booru.service';
import { catchError, of } from 'rxjs';
import { TagsService } from '@modules/shared/services/tags.service';

export const postsCountResolver: ResolveFn<number> = () => {
  const tags = inject(TagsService).getSelectedTags();
  const safeSearch = inject(SettingsService).get('safeSearch');
  return inject(BooruService)
    .getPostsCount([safeSearch && 'rating:g', ...tags])
    .pipe(catchError(() => of(0)));
};
