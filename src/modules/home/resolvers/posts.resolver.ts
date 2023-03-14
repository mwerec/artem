import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SettingsService } from '@modules/shared/services/settings.service';
import { BooruService } from '@modules/shared/services/booru.service';
import { BooruPost } from '@modules/shared/types/BooruPost';
import { catchError, of } from 'rxjs';
import { SearchService } from '@modules/shared/services/search.service';

export const postsResolver: ResolveFn<BooruPost[]> = () => {
  const { page, tag } = inject(SearchService).getLastSearch();
  const safeSearch = inject(SettingsService).get('safeSearch');
  return inject(BooruService)
    .getPosts([safeSearch && 'rating:g', ...tag], page)
    .pipe(catchError(() => of([])));
};
